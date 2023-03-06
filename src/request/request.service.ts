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
      relations: {
        user: {
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

  createRequest(bodyData) {
    this.requestRepository.insert({
      user_id: 1,
      reserved_time: bodyData.reserved_time,
      detail: bodyData.detail,
    });
  }

  updateRequest(bodyData) {}

  deleteRequest() {}
}
