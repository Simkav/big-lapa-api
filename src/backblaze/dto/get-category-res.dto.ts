import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryResponse {
  @ApiProperty()
  Url: string;
  @ApiProperty()
  name: string;
}
