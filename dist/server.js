"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, function () {
    console.log("server is running on http://localhost:" + PORT);
});
server.on("error", function (err) {
    console.error("the server has failed to start:", err);
    process.exit(1);
});
