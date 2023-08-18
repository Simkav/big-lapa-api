import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsBoolean, IsString } from 'class-validator';
export class DogCard {
  @ApiProperty()
  @prop({ required: true })
  @IsString()
  mainPhoto: string;

  @ApiProperty()
  @prop({ required: true })
  @IsString({ each: true })
  photos: string[];

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  sex: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  age: string;

  @ApiProperty()
  @IsBoolean()
  @prop({ required: true })
  haschip: boolean;

  @ApiProperty()
  @IsBoolean()
  @prop({ required: true })
  hasbreed: boolean;

  @ApiPropertyOptional()
  @IsString()
  @prop()
  breed?: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  size: string;
}
