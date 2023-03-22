import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
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
    return await this.messagesService.getReceivedMessages(req.userId);
  }

  @Get('/unread')
  async getUnreadMessages(@Req() req) {
    return await this.messagesService.getUnreadMessages(req.userId);
  }

  @Get('/sent')
  async getSentMessages(@Req() req) {
    return await this.messagesService.getSentMessages(req.userId);
  }

  @Get('/:id')
  async getMessageById(@Param('id') messageId, @Req() req) {
    messageId = Number(messageId.replace(':', ''));
    return await this.messagesService.getMessageById(messageId, req.userId);
  }

  @Post('/')
  async createMessage(@Body() data: CreateMessageDto, @Req() req) {
    return await this.messagesService.createMessage(req.userId, data);
  }

  @Delete('/:id')
  async deleteMessageById(@Param('id') messageId) {
    messageId = Number(messageId.replace(':', ''));
    return this.messagesService.deleteMessageById(messageId);
  }
}
