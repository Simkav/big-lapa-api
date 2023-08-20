import { Module } from '@nestjs/common';
import { nodemailerFactory } from './mail.provider';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { EmailLog } from './emailLog.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: EmailLog,
        schemaOptions: {
          collection: 'EmailLogs',
        },
      },
    ]),
  ],
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
