import { Injectable } from '@nestjs/common';
import fastq from 'fastq';
import type { queue, done } from 'fastq';
import { BackblazeService } from 'src/backblaze/backblaze.service';
import { DogCardService } from 'src/dog-card/dog-card.service';
import { scheduler } from 'node:timers/promises';
import { Cron, CronExpression } from '@nestjs/schedule';

type Task = {
  _id: string;
  Url: string;
};

@Injectable()
export class TaskQueueService {
  constructor(
    private readonly backblazeService: BackblazeService,
    private readonly dogCardService: DogCardService,
  ) {
    this.q = fastq(this.worker.bind(this), 1);
  }

  private readonly q: queue<Task>;

  private async worker(arg: Task, cb: done) {
    const findedCards = await this.dogCardService.checkIncludedPhotos(arg.Url);
    if (!findedCards.length) {
      await this.backblazeService.deleteFile(arg.Url);
    }
    await scheduler.wait(3000);
    cb(null);
  }

  //   private async deleteFile(id: string) {
  //     await this.backblazeService.deleteFile(id);
  //   }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async getPhotosToCheck() {
    const photos = [];
    photos.push(
      ...(await this.backblazeService.getFilesByCategory('main-photo')),
    );
    photos.push(
      ...(await this.backblazeService.getFilesByCategory('side-photo')),
    );
    photos.forEach(({ _id, Url }) => {
      this.q.push({ _id, Url });
    });
  }
}
