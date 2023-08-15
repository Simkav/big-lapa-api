import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty()
  @IsString()
  text: string;
}
