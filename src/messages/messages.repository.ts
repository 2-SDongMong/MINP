import { Injectable } from '@nestjs/common';
import { DataSource, Repository, Timestamp } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.manager);
  }

  async getMessageById(id: number): Promise<Partial<Message>> {
    const message = await this.createQueryBuilder('m')
      .select(['m.message_id', 'm.sender_id', 'm.recipient_id', 'm.content','m.read_at'])
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

  async updateReadAt(id: number,read_at: Date){
    const messages = await this.createQueryBuilder('m')
      .update(Message)
      .set({read_at:read_at})
      .where({ message_id: id })
      .execute();
    return messages
  }

  async getUnreadMessages(userId){
    const messages = await this.createQueryBuilder('m')
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where("m.sender_id = :userId OR m.read_at = :null", { sender_id: userId, read_at: null })
      .getMany();
    return messages
  }
}
