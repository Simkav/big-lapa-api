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
exports.DogCardService = void 0;
const common_1 = require("@nestjs/common");
const dog_card_model_1 = require("./dog-card.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongoose_1 = require("mongoose");
let DogCardService = exports.DogCardService = class DogCardService {
    constructor(dogCardModel) {
        this.dogCardModel = dogCardModel;
    }
    async createDogCard(data) {
        const createdDogCard = await this.dogCardModel.create(data);
        return createdDogCard.toObject();
    }
    async getDogCardById(id) {
        const dogCard = await this.dogCardModel.findById(id).exec();
        if (!dogCard) {
            throw new common_1.NotFoundException(`Dog card with id ${id} not found`);
        }
        return dogCard;
    }
    async getAllDogCards() {
        const allDogCards = await this.dogCardModel.find().exec();
        return allDogCards;
    }
    async deleteDogCardById(id) {
        const dogCard = await this.dogCardModel.findById(id).exec();
        if (!dogCard) {
            throw new common_1.NotFoundException(`Dog card with id ${id} not found`);
        }
        await this.dogCardModel.findByIdAndDelete(id).exec();
    }
};
exports.DogCardService = DogCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(dog_card_model_1.DogCard)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DogCardService);
//# sourceMappingURL=dog-card.service.js.map