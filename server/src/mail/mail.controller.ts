import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiCreatedResponse()
  @Post('/feedback')
  async sendFeedbackEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.mailService.sendEmail(sendEmailDto);
  }
}
