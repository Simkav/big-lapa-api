import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import path from 'path';

type CustomFileTypeValidatorOptions = {
  fileExtensions: string[];
};

export interface CustomIFile extends IFile {
  originalname: string;
}

export class CustomFileTypeValidator extends FileValidator<
  CustomFileTypeValidatorOptions,
  CustomIFile
> {
  buildErrorMessage(): string {
    return (
      'Invalid file extension. Allowed extensions are: ' +
      this.validationOptions.fileExtensions.join(', ')
    );
  }

  isValid(file?: CustomIFile): boolean {
    if (!file) return false;

    const fileExtension = path.extname(file.originalname).toLowerCase();

    return this.validationOptions.fileExtensions.includes(fileExtension);
  }
}
