import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly repository: MessagesRepository) {}
  async getMessageById(id: number, userId: number) {
    const message = await this.repository.getMessageById(id);

    if (message.sender_id !== userId && message.read_at === null) {
      const time = new Date();
      this.repository.updateReadAt(message.message_id, time);
    }
    if (_.isNil(message)) {
      throw new NotFoundException(`Message not found. id: ${id}`);
    }
    return message;
  }

  async getUnreadMessages(userId:number){
      const message = await this.repository.getUnreadMessages(userId)
      return message;
  }

  async getMessages() {
    return await this.repository.find();
  }

  async getReceivedMessages(recipientId: number) {
    return await this.repository.getReceivedMessages(recipientId);
  }

  async getSentMessages(senderId: number) {
    return await this.repository.getSentMessages(senderId);
  }

  async createMessage(senderId: number, data: CreateMessageDto) {
    const newMessage = this.repository.create({ sender_id: senderId, ...data });

    return await this.repository.save(newMessage);
  }

  deleteMessageById(id: number) {
    return this.repository.softDelete(id);
  }

  //자기가 자기쪽지 읽음 표시

  //
}
