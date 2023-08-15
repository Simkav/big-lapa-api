"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogCardModule = void 0;
const common_1 = require("@nestjs/common");
const dog_card_controller_1 = require("./dog-card.controller");
const dog_card_service_1 = require("./dog-card.service");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const dog_card_model_1 = require("./dog-card.model");
let DogCardModule = exports.DogCardModule = class DogCardModule {
};
exports.DogCardModule = DogCardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: dog_card_model_1.DogCard,
                    schemaOptions: {
                        collection: 'DogCards',
                    },
                },
            ]),
        ],
        controllers: [dog_card_controller_1.DogCardController],
        providers: [dog_card_service_1.DogCardService],
    })
], DogCardModule);
//# sourceMappingURL=dog-card.module.js.map