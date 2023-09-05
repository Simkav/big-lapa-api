import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PasswordValidation } from '../decorators/password-validation.decorator';

export class AuthDto {
  @ApiProperty()
  @IsString()
  login: string;

  @PasswordValidation()
  password: string;
}
