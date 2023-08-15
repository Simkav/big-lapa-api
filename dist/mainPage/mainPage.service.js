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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mainPage_model_1 = require("./mainPage.model/mainPage.model");
const mongoose_1 = require("mongoose");
const typegoose_1 = require("@typegoose/typegoose");
let MainService = exports.MainService = class MainService {
    constructor(mainModel) {
        this.mainModel = mainModel;
    }
    async create(dto) {
        const model = (0, typegoose_1.getModelForClass)(mainPage_model_1.MainModel);
        return model.findOneAndUpdate({}, dto, { upsert: true, new: true });
    }
    async getMainData() {
        return this.mainModel.findOne();
    }
};
exports.MainService = MainService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(mainPage_model_1.MainModel)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MainService);
//# sourceMappingURL=mainPage.service.js.map