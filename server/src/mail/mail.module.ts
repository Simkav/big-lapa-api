import { Module } from '@nestjs/common';
import { nodemailerFactory } from './mail.provider';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  providers: [
    {
      provide: 'mailer',
      useFactory: nodemailerFactory,
      inject: [ConfigService],
    },
    MailService,
  ],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
