import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadImageDto {
  @ApiPropertyOptional()
  @IsString()
  category?: string;
}
