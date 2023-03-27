import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import _ from 'lodash';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesRepository } from './messages.repository';
import { Cache } from 'cache-manager';

@Injectable()
export class MessagesService {
  constructor(
    private readonly repository: MessagesRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async getMessageById(id: number, userId: number) {
    const value = await this.cacheManager.get(`${id}`);
    if (!value) {
      const message = await this.repository.getMessageById(id);
      await this.cacheManager.set(`${id}`, message);
      if (message.sender_id !== userId && message.read_at === null) {
        const time = new Date();
        this.repository.updateReadAt(message.message_id, time);
      }
      if (_.isNil(message)) {
        throw new NotFoundException(`Message not found. id: ${id}`);
      }
      return message;
    }
    return value;
  }

  async getUnreadMessages(userId: number) {
    const value = await this.cacheManager.get(`unread${userId}`);

    if (!value) {
      const message = await this.repository.getUnreadMessages(userId);
      await this.cacheManager.set(`unread${userId}`, message);

      return message;
    }
    return value;
  }

  async getMessages() {
    return await this.repository.find();
  }

  async getReceivedMessages(recipientId: number) {
    const value = await this.cacheManager.get(`recipient${recipientId}`);

    if (!value) {
      const message = await this.repository.getReceivedMessages(recipientId);
      await this.cacheManager.set(`recipient${recipientId}`, message);

      return message;
    }
    return value;
  }

  async getSentMessages(senderId: number) {
    const value = await this.cacheManager.get(`sender${senderId}`);

    if (!value) {
      const message = await this.repository.getSentMessages(senderId);
      await this.cacheManager.set(`sender${senderId}`, message);

      return message;
    }
    return value;
  }

  async createMessage(senderId: number, data: CreateMessageDto) {
    const newMessage = this.repository.create({ sender_id: senderId, ...data });
    await this.cacheManager.del('/messages');
    return await this.repository.save(newMessage);
  }

  async deleteMessageById(id: number) {
    await this.cacheManager.del('/messages');
    return this.repository.softDelete(id);
  }

}
