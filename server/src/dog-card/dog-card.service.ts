import { Injectable, NotFoundException } from '@nestjs/common';
import { DogCard } from './dog-card.model';
import { InjectModel } from 'nestjs-typegoose';
import { Model } from 'mongoose';
import { UpdateDogDto } from './dto/update-dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import { BackblazeService } from 'src/backblaze/backblaze.service';

@Injectable()
export class DogCardService {
  constructor(
    @InjectModel(DogCard) private dogCardModel: Model<DogCard>,
    private readonly backblazeService: BackblazeService,
  ) {}

  async createDogCard(createDogDto: CreateDogDto): Promise<DogCard> {
    const createdDogCard = await this.dogCardModel.create(createDogDto);
    return createdDogCard.toObject();
  }

  async getDogCardById(id: string): Promise<DogCard | null> {
    const dogCard = await this.findDogById(id);
    return dogCard;
  }

  private async findDogById(id: string) {
    try {
      const dog = await this.dogCardModel.findById(id);
      if (dog === null) {
        throw new NotFoundException('Dog not found');
      }
      return dog;
    } catch (error) {
      throw new NotFoundException('Dog not found');
    }
  }

  async updateDog(id: string, updateDogDto: UpdateDogDto) {
    const dog = await this.findDogById(id);

    if (updateDogDto.photos) {
      for (const photo of dog.photos) {
        if (!updateDogDto.photos.includes(photo)) {
          await this.backblazeService.deleteFile(photo);
        }
      }
    }

    if (updateDogDto.mainPhoto) {
      if (updateDogDto.mainPhoto !== dog.mainPhoto) {
        await this.backblazeService.deleteFile(dog.mainPhoto);
      }
    }
    await dog.updateOne(updateDogDto);
    return await this.dogCardModel.findById(id);
  }

  async getAllDogCards(): Promise<DogCard[]> {
    const allDogCards = await this.dogCardModel.find().exec();
    return allDogCards;
  }

  async deleteDogCardById(id: string): Promise<void> {
    await this.findDogById(id);
    await this.dogCardModel.findByIdAndDelete(id).exec();
  }
}
