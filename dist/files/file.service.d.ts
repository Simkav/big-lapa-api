/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { BackblazeService } from '../backblaze/backblaze.service';
export declare class FileService implements OnModuleInit {
    private readonly backblazeService;
    private dirPath;
    constructor(backblazeService: BackblazeService);
    onModuleInit(): Promise<void>;
    private uploadFile;
    uploadToBackBlaze(path: any, name: any, type: any): Promise<void>;
    private getFile;
    convertToWebP(file: Buffer, name: string): Promise<string>;
    private deleteFile;
    private getWebpPath;
    private getPath;
}
