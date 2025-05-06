"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const images_1 = __importDefault(require("./routes/images"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
//app.use(express.static(path.join(__dirname, '../../public')));
app.use('/api/images', images_1.default);
app.use('/api/upload', upload_1.default);
app.use('/images/full', express_1.default.static(path_1.default.join(__dirname, '../public/images/full')));
app.get(/(.*)/, (req, res) => {
    res.sendFile(path_1.default.resolve('public/index.html'));
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
