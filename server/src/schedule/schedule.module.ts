import { BackblazeModule } from './../backblaze/backblaze.module';
import { Module } from '@nestjs/common';
import { DogCardModule } from 'src/dog-card/dog-card.module';
import { TaskQueueService } from './task-queue.service';

@Module({
  providers: [TaskQueueService],
  imports: [DogCardModule, BackblazeModule],
  exports: [TaskQueueService],
})
export class CronModule {}
