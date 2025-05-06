"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "images/full/");
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/', upload.single('image'), (request, response) => {
    try {
        if (!request.file) {
            response.status(400).json({
                error: "file isn't uploaded successfuly"
            });
            return;
        }
        response.status(200).json({
            message: "file uploaded successfully",
            filename: request.file.originalname,
            path: request.file.path
        });
    }
    catch (error) {
        console.error("error in img uploading", error);
        const errorMessage = error instanceof Error ? error.message : "error in uploading";
        const errorResponse = {
            error: "error in uploading",
            status: 500
        };
        if (process.env.NODE_ENV !== "production") {
            errorResponse.details = errorMessage;
        }
        response.status(500).json(errorResponse);
    }
});
exports.default = router;
