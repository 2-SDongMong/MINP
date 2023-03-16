import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository, Timestamp } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.manager);
  }

  async getMessageById(id: number): Promise<Partial<Message>> {
    const message = await this.createQueryBuilder('m')
      .select([
        'm.message_id',
        'm.sender_id',
        'm.recipient_id',
        'm.content',
        'm.read_at',
      ])
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where({ message_id: id })
      .getOne();
    return message;
  }

  async getReceivedMessages(recipientId: number) {
    const messages = await this.createQueryBuilder('m')
      .select(['m.content','m.message_id','m.created_at','m.recipient_id','m.sender_id'])
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where('m.recipient_id = :recipientId', { recipientId })
      .getMany();
    return messages;
  }

  async getSentMessages(senderId: number) {
    const messages = await this.createQueryBuilder('m')
      .select(['m.content','m.message_id','m.created_at','m.recipient_id','m.sender_id'])
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .where('m.sender_id = :senderId', { senderId })
      .getMany();
    return messages;
  }

  async updateReadAt(id: number, read_at: Date) {
    const messages = await this.createQueryBuilder('m')
      .update(Message)
      .set({ read_at: read_at })
      .where({ message_id: id })
      .execute();
    return messages;
  }

  async getUnreadMessages(userId:number){
    const messages = await this.createQueryBuilder('m')
      .select(['m.content','m.message_id','m.created_at','m.recipient_id','m.sender_id'])
      .addSelect(['sender.nickname', 'receiver.nickname'])
      .leftJoin('m.send_user', 'sender')
      .leftJoin('m.receive_user', 'receiver')
      .where("m.recipient_id = :userId ", { userId })
      .andWhere("m.read_at IS NULL" )
      .getMany()

    return messages
  }
}
