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
exports.DogCardController = void 0;
const common_1 = require("@nestjs/common");
const dog_card_model_1 = require("./dog-card.model");
const dog_card_service_1 = require("./dog-card.service");
let DogCardController = exports.DogCardController = class DogCardController {
    constructor(dogCardService) {
        this.dogCardService = dogCardService;
    }
    async createDogCard(data) {
        return this.dogCardService.createDogCard(data);
    }
    async getAllDogCards() {
        return this.dogCardService.getAllDogCards();
    }
    async getDogCardById(id, res) {
        try {
            const dogCard = await this.dogCardService.getDogCardById(id);
            if (!dogCard) {
                res.status(404).json({ message: `Dog card with id ${id} not found` });
            }
            else {
                res.status(200).json(dogCard);
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An error occurred' });
            }
        }
    }
    async deleteDogCard(id, res) {
        try {
            await this.dogCardService.deleteDogCardById(id);
            res.status(200).json({ message: 'Dog card deleted successfully' });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(404).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An error occurred' });
            }
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dog_card_model_1.DogCard]),
    __metadata("design:returntype", Promise)
], DogCardController.prototype, "createDogCard", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DogCardController.prototype, "getAllDogCards", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DogCardController.prototype, "getDogCardById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DogCardController.prototype, "deleteDogCard", null);
exports.DogCardController = DogCardController = __decorate([
    (0, common_1.Controller)('dog-cards'),
    __metadata("design:paramtypes", [dog_card_service_1.DogCardService])
], DogCardController);
//# sourceMappingURL=dog-card.controller.js.map