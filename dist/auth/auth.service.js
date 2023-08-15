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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const auth_model_1 = require("./auth.model/auth.model");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const authConstants_1 = require("./authConstants");
let AuthService = exports.AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findUser(userName) {
        return this.userModel.findOne({ userName }).exec();
    }
    async createUser(dto) {
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const newUser = new this.userModel({
            userName: dto.login,
            passwordHash: await (0, bcryptjs_1.hash)(dto.password, salt),
        });
        return newUser.save();
    }
    async validateUser(email, password) {
        const user = await this.findUser(email);
        if (!user) {
            throw new common_1.UnauthorizedException(authConstants_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await (0, bcryptjs_1.compare)(password, user.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException(authConstants_1.WRONG_PASSWORD_ERROR);
        }
        return { userName: user.userName };
    }
    async login(userName) {
        const payload = { userName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async changePassword(userName, oldPassword, newPassword) {
        const user = await this.findUser(userName);
        if (!user) {
            throw new common_1.NotFoundException(authConstants_1.USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await (0, bcryptjs_1.compare)(oldPassword, user.passwordHash);
        if (!isCorrectPassword) {
            throw new common_1.UnauthorizedException(authConstants_1.WRONG_PASSWORD_ERROR);
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        user.passwordHash = await (0, bcryptjs_1.hash)(newPassword, salt);
        await user.save();
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(auth_model_1.UserModel)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map