import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail/mail.service';
import { SendEmailDto } from './mail/dto/send-email.dto';
@ApiTags('ping')
@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}
  @Get('/ping')
  getHello(): string {
    return 'pong';
  }
  @Post('/email')
  async testEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.mailService.sendEmail(sendEmailDto);
  }
}
