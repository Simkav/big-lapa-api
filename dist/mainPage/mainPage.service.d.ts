/// <reference types="mongoose/types/models" />
import { DocumentType } from '@typegoose/typegoose';
import { MainModel } from './mainPage.model/mainPage.model';
import { Model } from 'mongoose';
import { MainDto } from './dto/mainPage.dto';
export declare class MainService {
    private readonly mainModel;
    constructor(mainModel: Model<MainModel>);
    create(dto: MainDto): Promise<DocumentType<MainModel>>;
    getMainData(): Promise<MainModel>;
}
