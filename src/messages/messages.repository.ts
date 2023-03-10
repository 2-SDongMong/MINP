import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.manager);
  }

  async getMessageById(id: number): Promise<Partial<Message>> {
    const message = await this.createQueryBuilder('m')
      .select(['a.message_id', 'a.sender_id', 'a.recipient_id', 'content'])
      .where({ message_id: id })
      //   .relation('a.sender_user')
      .getOne();
    return message;
  }
}
