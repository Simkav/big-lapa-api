import { prop } from '@typegoose/typegoose';

export class EmailLog {
  @prop({ required: true })
  email: string;

  @prop({ default: Date.now })
  send_time: Date;
}
