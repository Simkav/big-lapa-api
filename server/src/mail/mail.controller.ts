import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerBehindProxyGuard } from 'src/guards/throttler-behind-proxy.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiCreatedResponse()
  @HttpCode(200)
  @Throttle(2, 60)
  @UseGuards(ThrottlerBehindProxyGuard)
  @Post('/feedback')
  async sendFeedbackEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.mailService.sendEmailFeedback(sendEmailDto);
  }
}
