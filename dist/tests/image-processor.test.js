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
const image_processor_1 = require("../utilities/image-processor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const testImage = {
    filename: "test.jpg",
    height: 200,
    width: 200
};
describe("image processing", () => {
    afterAll(() => {
        const outputDir = path_1.default.join(__dirname, "../../images/thumb");
        if (fs_1.default.existsSync(outputDir)) {
            fs_1.default.readdirSync(outputDir).filter(file => file.startsWith('test-'))
                .forEach(file => fs_1.default.unlinkSync(path_1.default.join(outputDir, file)));
        }
    });
    it("creates resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        const outputPath = yield (0, image_processor_1.processingImage)(testImage);
        expect(fs_1.default.existsSync(outputPath)).toBe(true);
    }));
    it("returns same path for same dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const firstPath = yield (0, image_processor_1.processingImage)(testImage);
        const secondPath = yield (0, image_processor_1.processingImage)(testImage);
        expect(firstPath).toBe(secondPath);
    }));
    it('fails for missing images', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, image_processor_1.processingImage)({
            filename: 'missing.jpg',
            width: 100,
            height: 100
        })).rejects.toThrow();
    }));
    it("processes with quality parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const outputPath = yield (0, image_processor_1.processingImage)(Object.assign({}, testImage));
        expect(fs_1.default.existsSync(outputPath)).toBe(true);
    }));
});
