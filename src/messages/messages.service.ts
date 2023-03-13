import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly repository: MessagesRepository) {}

  async getMessageById(id: number) {
    const message = await this.repository.getMessageById(id);
    if (_.isNil(message)) {
      throw new NotFoundException(`Message not found. id: ${id}`);
    }
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
}
