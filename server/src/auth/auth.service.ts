import { MailService } from './../mail/mail.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './auth.model/auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './authConstants';
import { ConfigService } from '@nestjs/config';
import { IEnv } from 'src/configs/env.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService<IEnv>,
  ) {}

  async findUser(userName: string) {
    return this.userModel.findOne({ userName }).exec();
  }

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      userName: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'userName'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { userName: user.userName };
  }

  async login(userName: string) {
    const payload = { userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(
    userName: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.findUser(userName);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(oldPassword, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    const salt = await genSalt(10);
    user.passwordHash = await hash(newPassword, salt);
    await user.save();
  }

  async generateResetPasswordToken(email: string) {
    const user = await this.findUser(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const payload = { userName: user.userName, resetPassword: true };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('RESET_TOKEN_TTL'),
    });
    await this.mailService.sendResetPasswordEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid reset password token');
    }

    if (!payload || !payload.resetPassword) {
      throw new UnauthorizedException('Invalid reset password token');
    }

    const user = await this.findUser(payload.userName);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const salt = await genSalt(10);
    user.passwordHash = await hash(newPassword, salt);
    await user.save();
  }
}
