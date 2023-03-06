import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async getRequests() {
    const request = await this.requestRepository.find({
      // where: { deleted_at: null },
      // 이 조건이 없어도 이 조건으로 find 해온다.
      relations: {
        // user: true,
        user: {
          // user_id: true,
          // nickname: true,
          // select: ['nickname',],
          // nickname: true,
          cats: true,
        },
      },
      select: {
        user: {
          nickname: true,
          cats: {
            name: true,
            age: true,
            gender: true,
            neutered: true,
            image: true,
          },
        },
        request_id: true,
        reserved_time: true,
        detail: true,
      },
    });
    return request;
  }

  async getRequestById(id: number) {}

  createRequest(resevedTime: Date, detail: string) {
    this.requestRepository.insert({
      user_id: 1,
      reserved_time: resevedTime,
      detail,
    });
  }

  updateRequest(reservedTime: Date, detail: string) {}

  deleteRequest() {}
}
