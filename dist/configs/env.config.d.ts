import * as Joi from 'joi';
export interface IEnv {
    PORT: number;
    MONGO_URL: string;
    JWT_SECRET: string;
    BB2_SECRET_KEY: string;
    BB2_SECRET_KEY_NAME: string;
    BB2_FILES_BUCKET_ID: string;
}
export declare const envValidationSchea: Joi.ObjectSchema<IEnv>;
