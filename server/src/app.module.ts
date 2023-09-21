import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './mainPage/mainPage.module';
import { DogCardModule } from './dog-card/dog-card.module';
import { BackblazeModule } from './backblaze/backblaze.module';
import { envValidationSchea } from './configs/env.config';
import { MailModule } from './mail/mail.module';
import { ThrottlerModule } from '@nestjs/throttler';
// import { FilesModule } from './files/files.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchea,
    }),
    ThrottlerModule.forRoot({}),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    MainModule,
    // FilesModule,
    BackblazeModule,
    DogCardModule,
    MailModule,
    ScheduleModule.forRoot(),
    CronModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
