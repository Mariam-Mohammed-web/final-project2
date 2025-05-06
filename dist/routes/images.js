"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_processor_1 = require("../utilities/image-processor");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const router = express_1.default.Router();
router.get('/process', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = request.query;
        if (!filename || !width || !height) {
            response.status(400).json({
                error: "missing required parametrs",
                required: ["filename", "width", "height"]
            });
            return;
        }
        const widthNum = parseInt(width);
        const heightNum = parseInt(height);
        if (isNaN(widthNum) || isNaN(heightNum)) {
            response.status(400).json({
                error: "width and height must be numbers"
            });
            return;
        }
        const processedImagePath = yield (0, image_processor_1.processingImage)({
            filename: filename,
            width: widthNum,
            height: heightNum,
        });
        const relativePath = '/images/thumb/' + path_1.default.basename(processedImagePath);
        response.send(relativePath);
        if (!(0, fs_2.existsSync)(processedImagePath)) {
            response.status(500).json({
                error: "image cant be found"
            });
            return;
        }
        response.sendFile(path_1.default.resolve(processedImagePath), (err) => {
            if (err) {
                next(err);
            }
        });
    }
    catch (err) {
        console.error("err in img processing", err);
        const errMessage = err instanceof Error ? err.message : "err ocured";
        const errRes = {
            error: "img prosessing fail",
            status: 500
        };
        if (process.env.NODE_ENV !== "production") {
            errRes.details = errMessage;
        }
        response.status(500).json(errRes);
    }
}));
router.get('/', (req, res) => {
    const uploadsPath = path_1.default.join(__dirname, '../../images/full');
    fs_1.default.readdir(uploadsPath, (err, files) => {
        if (err) {
            console.error('failed to read uploads folder:', err);
            return res.status(500).json({ error: 'Failed to load images' });
        }
        const urls = files.map(filename => "/images/full/" + filename);
        res.json(urls);
    });
});
exports.default = router;
