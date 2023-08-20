import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsNotRuEmail } from 'src/decorators/notRuEmail.decorator';

export class SendEmailDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotRuEmail({ message: 'Email with .ru domain is not allowed' })
  email: string;

  @ApiProperty()
  @IsString()
  question: string;
}
