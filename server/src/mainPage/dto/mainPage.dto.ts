import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { ValidateEmail } from 'src/decorators/validate-email.decorator';
import { ValidateNumber } from '../decorators/phone-validator.decorator';

export class MainDto {
  @ApiProperty()
  @IsString()
  @ValidateNumber()
  first_phoneNumber: string;

  @ApiProperty()
  @IsString()
  @ValidateNumber()
  second_phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Length(6, 320)
  @ValidateEmail()
  @IsEmail()
  email: string;
}
