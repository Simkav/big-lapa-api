/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { UserModel } from './auth.model/auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserModel>, jwtService: JwtService);
    findUser(userName: string): Promise<import("mongoose").Document<unknown, {}, UserModel> & UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createUser(dto: AuthDto): Promise<import("mongoose").Document<unknown, {}, UserModel> & UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    validateUser(email: string, password: string): Promise<Pick<UserModel, 'userName'>>;
    login(userName: string): Promise<{
        access_token: string;
    }>;
    changePassword(userName: string, oldPassword: string, newPassword: string): Promise<void>;
}
