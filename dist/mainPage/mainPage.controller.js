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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const mainPage_service_1 = require("./mainPage.service");
const mainPage_dto_1 = require("./dto/mainPage.dto");
let MainController = exports.MainController = class MainController {
    constructor(mainService) {
        this.mainService = mainService;
    }
    async create(dto) {
        return this.mainService.create(dto);
    }
    async getMainData() {
        return this.mainService.getMainData();
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mainPage_dto_1.MainDto]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getMainData", null);
exports.MainController = MainController = __decorate([
    (0, common_1.Controller)('main'),
    __metadata("design:paramtypes", [mainPage_service_1.MainService])
], MainController);
//# sourceMappingURL=mainPage.controller.js.map