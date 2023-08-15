/// <reference types="multer" />
import { type ParseFilePipe, type PipeTransform } from '@nestjs/common';
export declare class ParseFilesPipe implements PipeTransform<Express.Multer.File[]> {
    private readonly pipe;
    constructor(pipe: ParseFilePipe);
    transform(files: Express.Multer.File[]): Promise<Express.Multer.File[]>;
}
