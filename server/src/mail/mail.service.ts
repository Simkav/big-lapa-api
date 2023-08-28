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

  async sendEmailFeedback(sendEmailDto: SendEmailDto) {
    const subject = `Feedback from ${sendEmailDto.email}`;
    const text = `
    Name: ${sendEmailDto.name}
    Email: ${sendEmailDto.email}
    Question: ${sendEmailDto.question}
  `;
    const result = await this.mailer.sendMail({
      to: this.from,
      from: this.from,
      text: text,
      subject: subject,
    });

    return result;
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const baseURL = this.configService.get('FRONTEND_URL');
    const resetPasswordLink = `${baseURL}/reset-password/recovery?token=${token}`;
    const subject = `Password Reset Request`;
    const text = `You have requested to reset your password. Please click the link below to reset your password:\n\n${resetPasswordLink}\n\nIf you did not request this, please ignore this email.`;

    const result = await this.mailer.sendMail({
      to: this.from,
      from: this.from,
      text: text,
      subject: subject,
    });

    return result;
  }
}
