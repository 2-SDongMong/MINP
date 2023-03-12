import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Request } from './request.entity';
import { UpdateRequestDto } from './dto/update-request.dto';
import _ from 'lodash';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>
  ) {}

  async getRequests() {
    const request = await this.requestsRepository.find({
      relations: {
        user: {
          cats: true,
        },
      },
      select: {
        user: {
          nickname: true,
          cats: {
            image: true,
          },
        },
        request_id: true,
        reserved_time: true,
      },
    });
    return request;
  }

  async getRequestById(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { request_id: id },
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

    if (_.isNil(request)) {
      throw new NotFoundException(`Request article not found. id: ${id}`);
    }

    return request;
  }

  async createRequest(id: number, bodyData: CreateRequestDto) {
    const { reserved_time, detail } = bodyData;
    const newRequest = this.requestsRepository.create({
      user_id: id,
      reserved_time,
      detail,
    });
    return await this.requestsRepository.save(newRequest);
  }

  private async ExistenceCheckById(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { request_id: id },
    });
    if (_.isNil(request)) {
      throw new NotFoundException(`Request article not found. id: ${id}`);
    }
  }

  async updateRequestById(id: number, bodyData: UpdateRequestDto) {
    await this.ExistenceCheckById;

    const { reserved_time, detail } = bodyData;

    // reserved_time을 업데이트 하지 않는 경우(detail만 입력된 경우)
    if (!reserved_time) {
      this.requestsRepository.update(id, { detail });
      return;
    }
    // detail을 업데이트 하지 않는 경우(reserved_time만 입력된 경우)
    if (!detail) {
      this.requestsRepository.update(id, { reserved_time });
      return;
    }
    // reserved_time과 detail 항목을 모두 업데이트
    this.requestsRepository.update(id, { reserved_time, detail });
  }

  deleteRequestById(id: number) {
    this.requestsRepository.softDelete(id);
  }
}
