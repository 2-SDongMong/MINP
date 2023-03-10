import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly repository: MessagesRepository) {}

  async getMessageById(id: number) {
    return await this.repository.getMessageById(id);
  }
}
