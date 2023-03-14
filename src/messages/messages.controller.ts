import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('message')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }
 
    @Get()
    async getMessages() {
        return await this.messagesService.getMessages();
    }

    @Get('/received')
    async getReceivedMessages(@Req() req) {
        return await this.messagesService.getReceivedMessages(req.user);
    }

    @Get('/unread')
    async getUnreadMessages(@Req() req){
        return await this.messagesService.getUnreadMessages(req.user);
    }

    @Get('/sent')
    async getSentMessages(@Req() req) {
        return await this.messagesService.getSentMessages(req.user);
    }
    @Get('/:id')
    async getMessageById(@Param('id') messageId: number,@Req() req) {
        return await this.messagesService.getMessageById(messageId,req.user);
    }

    @Post()
    async createMessage(@Req() req, @Body() data: CreateMessageDto) {
        
        return await this.messagesService.createMessage(req.user, data);
    }

    @Delete('/:id')
    async deleteMessageById(@Param('id') messageId: number) {
        return this.messagesService.deleteMessageById(messageId);
    }

    //1 메시지 보내기 post
    //from to 

    

    ////////메시지 모두 user_id 에 맞는거만 middleware에서 빼오고

    //2 메시지 전체조회


    //3 메시지 안읽은거 조회
    //메시지 상태 안 읽음 


    //4 메시지 상세조회
    //메시지 아이디 받아와서 조회


    //5 메시지 삭제
    //메시지 아이디 받아와서 삭제







}
