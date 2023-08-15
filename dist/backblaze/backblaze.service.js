"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackblazeService = void 0;
const common_1 = require("@nestjs/common");
const backblaze_b2_1 = __importDefault(require("backblaze-b2"));
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongoose_1 = require("mongoose");
const file_model_1 = require("./models/file.model");
let BackblazeService = exports.BackblazeService = class BackblazeService {
    constructor(bb2, fileModel, configService) {
        this.bb2 = bb2;
        this.fileModel = fileModel;
        this.configService = configService;
        this.bucketId = configService.get('BB2_FILES_BUCKET_ID');
    }
    async uploadFile(file, name, type = '') {
        try {
            const { data } = await this.bb2.getUploadUrl({
                bucketId: this.bucketId,
            });
            const result = await this.bb2.uploadFile({
                data: file,
                fileName: name,
                uploadUrl: data.uploadUrl,
                uploadAuthToken: data.authorizationToken,
            });
            const url = result.data.fileId;
            const newFile = { Url: url };
            if (type)
                newFile.category = type;
            if (name)
                newFile.name = name;
            await this.fileModel.create(newFile);
            return url;
        }
        catch (error) {
            console.error(error);
            throw new Error('Something goes wrong');
        }
    }
    async getFileInfo(url) {
        console.log(url, 'url');
        const res = await this.fileModel.findOne({ Url: url });
        return res;
    }
    async getFile(id) {
        try {
            const res = await this.bb2.downloadFileById({
                fileId: id,
                responseType: 'stream',
            });
            return res.data;
        }
        catch (error) {
            throw new Error('Something goes wrong');
        }
    }
    async getImagesByCategory(category) {
        return this.fileModel.find({ category }).exec();
    }
};
exports.BackblazeService = BackblazeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('bb2Client')),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(file_model_1.FileModel)),
    __metadata("design:paramtypes", [backblaze_b2_1.default,
        mongoose_1.Model,
        config_1.ConfigService])
], BackblazeService);
//# sourceMappingURL=backblaze.service.js.map