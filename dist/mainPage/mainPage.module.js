"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const mainPage_controller_1 = require("./mainPage.controller");
const mainPage_service_1 = require("./mainPage.service");
const mainPage_model_1 = require("./mainPage.model/mainPage.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let MainModule = exports.MainModule = class MainModule {
};
exports.MainModule = MainModule = __decorate([
    (0, common_1.Module)({
        controllers: [mainPage_controller_1.MainController],
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: mainPage_model_1.MainModel,
                    schemaOptions: {
                        collection: 'MainPage',
                    },
                },
            ]),
        ],
        providers: [mainPage_service_1.MainService],
    })
], MainModule);
//# sourceMappingURL=mainPage.module.js.map