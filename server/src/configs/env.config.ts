import * as Joi from 'joi';

export interface IEnv {
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET: string;
  BB2_SECRET_KEY: string;
  BB2_SECRET_KEY_NAME: string;
  BB2_FILES_BUCKET_ID: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  RESET_TOKEN_TTL: string;
  FRONTEND_URL: string;
}

const baseString = Joi.string().required().exist();
const baseNumber = Joi.number().required().exist();

export const envValidationSchea = Joi.object<IEnv>({
  PORT: baseNumber,
  MONGO_URL: baseString,
  JWT_SECRET: baseString,
  BB2_SECRET_KEY: baseString,
  BB2_SECRET_KEY_NAME: baseString,
  BB2_FILES_BUCKET_ID: baseString,
  SMTP_HOST: baseString,
  SMTP_PORT: baseNumber,
  SMTP_USER: baseString,
  SMTP_PASSWORD: baseString,
  RESET_TOKEN_TTL: baseString,
  FRONTEND_URL: baseString,
});
