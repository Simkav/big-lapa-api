import { Module } from '@nestjs/common';
import { DogCardController } from './dog-card.controller';
import { DogCardService } from './dog-card.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { DogCard } from './dog-card.model';
import { BackblazeModule } from 'src/backblaze/backblaze.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DogCard,
        schemaOptions: {
          collection: 'DogCards',
        },
      },
    ]),
    BackblazeModule,
  ],
  controllers: [DogCardController],
  providers: [DogCardService],
  exports: [DogCardService],
})
export class DogCardModule {}
