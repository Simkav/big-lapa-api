"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const webp_converter_1 = __importDefault(require("webp-converter"));
class FileService {
    constructor(backblazeService) {
        this.backblazeService = backblazeService;
        this.dirPath = path_1.default.join(__dirname, '..', 'temp');
    }
    async onModuleInit() {
    }
    async uploadFile(path, file) {
        await promises_1.default.writeFile(path, file);
    }
    async uploadToBackBlaze(path, name, type) {
    }
    async getFile(path) {
        const filePath = this.getPath(path);
        return await promises_1.default.readFile(filePath);
    }
    async convertToWebP(file, name) {
        const filePath = this.getPath(name);
        await this.uploadFile(filePath, file);
        const webpPath = this.getWebpPath(filePath);
        await webp_converter_1.default.cwebp(filePath, webpPath, '-q 80');
        await this.deleteFile(filePath);
        return webpPath;
    }
    async deleteFile(path) {
        await promises_1.default.unlink(path);
    }
    getWebpPath(path) {
        const splitedPath = path.split('.');
        splitedPath.splice(-1, 1, 'webp');
        return splitedPath.join('.');
    }
    getPath(name) {
        return path_1.default.join(this.dirPath, name);
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map