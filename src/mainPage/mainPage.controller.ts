import { Body, Controller, Get, Post } from '@nestjs/common';
import { MainService } from './mainPage.service';
import { MainDto } from './dto/mainPage.dto';
import { MainModel } from './mainPage.model/mainPage.model';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Post('create')
  @ApiCreatedResponse()
  async create(@Body() dto: MainDto) {
    return this.mainService.create(dto);
  }

  @Get('get')
  @ApiOkResponse({ type: MainModel })
  async getMainData(): Promise<MainModel> {
    return this.mainService.getMainData();
  }
}
