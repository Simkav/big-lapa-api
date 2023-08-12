import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  userName: string;

  @prop()
  passwordHash: string;
}
