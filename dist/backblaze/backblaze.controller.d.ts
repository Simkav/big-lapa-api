/// <reference types="multer" />
import { Response } from 'express';
import { BackblazeService } from './backblaze.service';
import { FileService } from '../files/file.service';
import { ConfigService } from '@nestjs/config';
import { IEnv } from 'src/configs/env.config';
export declare class BackBlazeController {
    private readonly backblazeService;
    private readonly fileService;
    private readonly configService;
    constructor(backblazeService: BackblazeService, fileService: FileService, configService: ConfigService<IEnv>);
    uploadImage(images: Express.Multer.File[]): Promise<any[]>;
    uploadDocument(document: Express.Multer.File): Promise<any>;
    getFileByUrl(url: string, response: Response): Promise<void>;
    getDocumentByUrl(url: string, response: Response): Promise<void>;
    getImagesByCategory(category: string): Promise<string[]>;
}
