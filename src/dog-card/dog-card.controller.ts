import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { DogCard } from './dog-card.model';
import { DogCardService } from './dog-card.service';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('dog-cards')
@Controller('dog-cards')
export class DogCardController {
  constructor(private readonly dogCardService: DogCardService) {}

  @Post()
  @ApiCreatedResponse()
  async createDogCard(@Body() data: DogCard): Promise<DogCard> {
    return this.dogCardService.createDogCard(data);
  }

  @ApiOkResponse({ type: [DogCard] })
  @Get()
  async getAllDogCards(): Promise<DogCard[]> {
    return this.dogCardService.getAllDogCards();
  }

  @ApiOkResponse({ type: DogCard })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getDogCardById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const dogCard = await this.dogCardService.getDogCardById(id);
      if (!dogCard) {
        res.status(404).json({ message: `Dog card with id ${id} not found` });
      } else {
        res.status(200).json(dogCard);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An error occurred' });
      }
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  async deleteDogCard(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.dogCardService.deleteDogCardById(id);
      res.status(200).json({ message: 'Dog card deleted successfully' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An error occurred' });
      }
    }
  }
}
