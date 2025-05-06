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
exports.processingImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const processingImage = (parametrs) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = parametrs;
    const inputDir = path_1.default.resolve(__dirname, "../../images/full");
    const outputDir = path_1.default.resolve(__dirname, "../../images/thumb");
    const inputPath = path_1.default.join(inputDir, filename + ".jpg");
    const outputPath = path_1.default.join(outputDir, filename + "_" + width + "x" + height + ".jpg");
    if (fs_1.default.existsSync(inputPath)) {
        console.log("main image is found");
    }
    else {
        throw new Error("image isn't found");
    }
    if (fs_1.default.existsSync(outputPath)) {
        console.log("thumbPath/outputpath is found");
        return outputPath;
    }
    try {
        yield (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
        return outputPath;
    }
    catch (err) {
        throw new Error("image processing failed");
    }
});
exports.processingImage = processingImage;
