"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackblazeModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const files_module_1 = require("../files/files.module");
const backblaze_controller_1 = require("./backblaze.controller");
const backblaze_instance_provider_1 = require("./backblaze.instance.provider");
const backblaze_service_1 = require("./backblaze.service");
const file_model_1 = require("./models/file.model");
let BackblazeModule = exports.BackblazeModule = class BackblazeModule {
};
exports.BackblazeModule = BackblazeModule = __decorate([
    (0, common_1.Module)({
        controllers: [backblaze_controller_1.BackBlazeController],
        imports: [
            files_module_1.FilesModule,
            platform_express_1.MulterModule.register({ storage: (0, multer_1.memoryStorage)() }),
            nestjs_typegoose_1.TypegooseModule.forFeature([file_model_1.FileModel]),
        ],
        providers: [
            {
                provide: 'bb2Client',
                useFactory: backblaze_instance_provider_1.backBlazeFactory,
                inject: [config_1.ConfigService],
            },
            backblaze_service_1.BackblazeService,
        ],
        exports: [backblaze_service_1.BackblazeService],
    })
], BackblazeModule);
//# sourceMappingURL=backblaze.module.js.map