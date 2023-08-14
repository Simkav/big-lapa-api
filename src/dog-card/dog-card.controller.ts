import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Res,
  NotFoundException,
  Patch,
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
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@ApiTags('dog-cards')
@Controller('dog-cards')
export class DogCardController {
  constructor(private readonly dogCardService: DogCardService) {}

  @Post()
  @ApiCreatedResponse()
  async createDogCard(@Body() createDogDto: CreateDogDto): Promise<DogCard> {
    return this.dogCardService.createDogCard(createDogDto);
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

  @Patch(':id')
  async updateDog(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return await this.dogCardService.updateDog(id, updateDogDto);
  }
}
