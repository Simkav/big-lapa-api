import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class DogCard {
  @ApiProperty()
  @prop({ required: true })
  mainPhoto: string;

  @ApiProperty()
  @prop({ required: true })
  photos: string[];

  @ApiProperty()
  @prop({ required: true })
  name: string;

  @ApiProperty()
  @prop({ required: true })
  sex: string;

  @ApiProperty()
  @prop({ required: true })
  age: string;

  @ApiProperty()
  @prop({ required: true })
  haschip: boolean;

  @ApiProperty()
  @prop({ required: true })
  hasbreed: boolean;

  @ApiPropertyOptional()
  @prop()
  breed?: string;

  @ApiProperty()
  @prop({ required: true })
  size: string;
}
