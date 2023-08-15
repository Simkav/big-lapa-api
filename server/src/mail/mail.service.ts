import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { IEnv } from 'src/configs/env.config';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private readonly from: string;
  constructor(
    @Inject('mailer') private readonly mailer: Transporter,
    private readonly configService: ConfigService<IEnv>,
  ) {
    this.from = this.configService.get('SMTP_USER');
  }
  async sendEmail(sendEmailDto: SendEmailDto) {
    return await this.mailer.sendMail({
      to: this.from,
      from: this.from,
      text: sendEmailDto.text,
      subject: 'Test',
    });
  }
}
