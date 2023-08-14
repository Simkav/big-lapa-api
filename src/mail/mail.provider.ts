import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { IEnv } from 'src/configs/env.config';

export const nodemailerFactory = async (configService: ConfigService<IEnv>) => {
  const transporter = nodemailer.createTransport({
    host: configService.get('SMTP_HOST'),
    port: configService.get('SMTP_PORT'),
    auth: {
      user: configService.get('SMTP_USER'),
      pass: configService.get('SMTP_PASSWORD'),
    },
  });
  return transporter;
};
