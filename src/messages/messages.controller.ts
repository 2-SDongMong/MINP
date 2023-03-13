import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getMessages() {
    return await this.messagesService.getMessages();
  }

  @Get('/received')
  async getReceivedMessages(@Req() req) {
    return await this.messagesService.getReceivedMessages(req.user);
  }

  @Get('/sent')
  async getSentMessages(@Req() req) {
    return await this.messagesService.getSentMessages(req.user);
  }
  @Get('/:id')
  async getMessageById(@Param('id') messageId: number) {
    return await this.messagesService.getMessageById(messageId);
  }

  @Post()
  async createMessage(@Req() req, @Body() data: CreateMessageDto) {
    return await this.messagesService.createMessage(req.user, data);
  }

  @Delete('/:id')
  async deleteMessageById(@Param('id') messageId: number) {
    return this.messagesService.deleteMessageById(messageId);
  }
}
