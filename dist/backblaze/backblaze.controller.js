"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackBlazeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mimeTypes = __importStar(require("mime-types"));
const backblaze_service_1 = require("./backblaze.service");
const validate_upload_files_decorator_1 = require("./decorators/validate.upload.files.decorator");
const file_service_1 = require("../files/file.service");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const singleExtensionRegex = /^[^.]+\.[a-zA-Z0-9]+$/;
let BackBlazeController = exports.BackBlazeController = class BackBlazeController {
    constructor(backblazeService, fileService, configService) {
        this.backblazeService = backblazeService;
        this.fileService = fileService;
        this.configService = configService;
    }
    async uploadImage(images) {
        if (!images) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        const links = await Promise.all(images.map((image) => this.backblazeService.uploadFile(image.buffer, image.originalname)));
        return links;
    }
    async uploadDocument(document) {
        if (!document) {
            throw new common_1.BadRequestException('No files uploaded');
        }
        const link = await this.backblazeService.uploadFile(document.buffer, document.originalname, 'Document');
        return link;
    }
    async getFileByUrl(url, response) {
        (await this.backblazeService.getFile(url)).pipe(response);
    }
    async getDocumentByUrl(url, response) {
        const getFileName = await this.backblazeService.getFileInfo(url);
        console.log(getFileName.name);
        response.setHeader('Content-Type', 'application/octet-stream');
        response.setHeader('Content-Disposition', `attachment; filename=${encodeURI(getFileName.name)}`);
        (await this.backblazeService.getFile(url)).pipe(response);
    }
    async getImagesByCategory(category) {
        const images = await this.backblazeService.getImagesByCategory(category);
        const imageUrls = images.map((image) => image.Url);
        return imageUrls;
    }
};
__decorate([
    (0, common_1.Post)('images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 6)),
    __param(0, (0, validate_upload_files_decorator_1.ValidateUploadFiels)(2097152, 'image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BackBlazeController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('documents'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('document', {
        fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.txt', '.pdf', '.doc'];
            const fileExtension = (0, path_1.extname)(file.originalname);
            const mimeType = mimeTypes.lookup(fileExtension);
            if (allowedExtensions.includes(fileExtension) &&
                (mimeType === 'text/plain' ||
                    mimeType === 'application/pdf' ||
                    mimeType === 'application/msword')) {
                if (!singleExtensionRegex.test(file.originalname)) {
                    cb(new common_1.BadRequestException('Invalid file name. Double extensions are not allowed.'), false);
                    return;
                }
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Only .txt, .doc, and .pdf files are allowed'), false);
            }
        },
        limits: {
            fileSize: 2 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BackBlazeController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(':url'),
    __param(0, (0, common_1.Param)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BackBlazeController.prototype, "getFileByUrl", null);
__decorate([
    (0, common_1.Get)('/document/:url'),
    __param(0, (0, common_1.Param)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BackBlazeController.prototype, "getDocumentByUrl", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BackBlazeController.prototype, "getImagesByCategory", null);
exports.BackBlazeController = BackBlazeController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [backblaze_service_1.BackblazeService,
        file_service_1.FileService,
        config_1.ConfigService])
], BackBlazeController);
//# sourceMappingURL=backblaze.controller.js.map