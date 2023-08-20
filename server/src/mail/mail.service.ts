import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { IEnv } from 'src/configs/env.config';
import { SendEmailDto } from './dto/send-email.dto';
import { ReturnModelType } from '@typegoose/typegoose';
import { EmailLog } from './emailLog.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class MailService {
  private readonly from: string;
  constructor(
    @Inject('mailer') private readonly mailer: Transporter,
    private readonly configService: ConfigService<IEnv>,
    @InjectModel(EmailLog)
    private readonly emailLogModel: ReturnModelType<typeof EmailLog>,
  ) {
    this.from = this.configService.get('SMTP_USER');
  }

  async logEmailSend(email: string) {
    const log = new this.emailLogModel({ email });
    await log.save();
  }

  async getEmailsSentLastMinute(email: string): Promise<number> {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    return await this.emailLogModel.countDocuments({
      email,
      send_time: { $gte: oneMinuteAgo },
    });
  }

  async sendEmailFeedback(sendEmailDto: SendEmailDto) {
    const emailsSent = await this.getEmailsSentLastMinute(sendEmailDto.email);
    if (emailsSent >= 2) {
      throw new HttpException(
        "Limit exceeded: Can't send more than 2 emails per minute.",
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

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

    await this.logEmailSend(sendEmailDto.email);

    return result;
  }
}
