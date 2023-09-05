import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export function PasswordValidation() {
  return applyDecorators(
    Length(8, 12),
    ApiProperty(),
    IsStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    IsString(),
    IsNotEmpty(),
  );
}
