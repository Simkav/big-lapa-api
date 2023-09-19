import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IsNotRuEmail } from '../decorators/notRuEmail.decorator';
import { ValidateEmail } from '../../decorators/validate-email.decorator';

export class SendEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Matches(new RegExp(/^[a-zA-Z -]+$/gm), {
    message: "Ім'я може складатись з літер пробілу або дефісу",
  })
  name: string;

  @ApiProperty()
  @Length(6, 320)
  @ValidateEmail()
  @IsNotRuEmail({ message: 'Email with .ru domain is not allowed' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;
}
