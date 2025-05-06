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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('API Endpoints', () => {
    describe('GET /api/images/process', () => {
        it('should return 400 when parametrs are missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/images/process');
            expect(response.status).toBe(400);
        }));
        it('should return 400 if parameters are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/images/process?filename=test&width=abc&height=200');
            expect(response.status).toBe(400);
        }));
        it('should return 200 and processed image for valid request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/images/process?filename=test&width=200&height=200');
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toMatch(/image\/jpeg/);
        }));
    });
    describe('POST /api/upload', () => {
        it('should return 400 if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/upload')
                .attach('image', '');
            expect(response.status).toBe(400);
        }));
        it('should return 200 for successful upload', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/upload')
                .attach('image', 'test/fixtures/test-image.jpg');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('filename');
        }));
        it('should reject invalid file types', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/upload')
                .attach('image', 'test/fixtures/invalid-file.txt');
            expect(response.status).toBe(400);
        }));
    });
});
