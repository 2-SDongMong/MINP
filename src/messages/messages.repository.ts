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
      .select(['m.message_id', 'm.sender_id', 'm.recipient_id', 'm.content'])
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where({ message_id: id })
      .getOne();
    return message;
  }

  async getReceivedMessages(recipientId: number): Promise<Partial<Message>[]> {
    const messages = await this.createQueryBuilder('m')
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where('m.recipient_id = :recipientId', { recipientId })
      .getMany();
    return messages;
  }

  async getSentMessages(senderId: number): Promise<Partial<Message>[]> {
    const messages = await this.createQueryBuilder('m')
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where('m.sender_id = :senderId', { senderId })
      .getMany();
    return messages;
  }
}
