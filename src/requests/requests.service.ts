import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import _ from 'lodash';
import { Cache } from 'cache-manager';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  // 오프셋 페이지네이션
  // async getRequestsPagination(page: number = 1) {
  //   const take = 8;

  //   const total = await this.requestsRepository.count();
  //   const requests = await this.requestsRepository.find({
  //     relations: {
  //       user: {
  //         cats: true,
  //       },
  //     },
  //     select: {
  //       user: {
  //         nickname: true,
  //         cats: {
  //           image: true,
  //         },
  //       },
  //       request_id: true,
  //       reserved_begin_date: true,
  //       reserved_end_date: true,
  //       updated_at: true,
  //       detail: true,
  //       is_ongoing: true,
  //     },
  //     order: {
  //       created_at: 'DESC',
  //     },
  //     take,
  //     skip: (page - 1) * take,
  //   });

  //   const last_Page = Math.ceil(total / take);

  //   if (last_Page >= page) {
  //     return {
  //       data: requests,
  //       meta: {
  //         total,
  //         page: page <= 0 ? (page = 1) : page,
  //         last_Page: last_Page,
  //       },
  //     };
  //   } else {
  //     throw new NotFoundException('해당 페이지는 존재하지 않습니다');
  //   }
  // }

  // async getRequestsByAddressBnamePagination(bname: string, page: number = 1) {
  //   const take = 8;

  //   const total = await this.requestsRepository.count();
  //   const requests = await this.requestsRepository.find({
  //     relations: {
  //       user: {
  //         cats: true,
  //       },
  //     },

  //     where: {
  //       user: {
  //         address_bname: bname},
  //       },
  //     select: {
  //       user: {
  //         nickname: true,
  //         cats: {
  //           image: true,
  //         },
  //       },
  //       request_id: true,
  //       reserved_begin_date: true,
  //       reserved_end_date: true,
  //       updated_at: true,
  //       detail: true,
  //       is_ongoing: true,
  //     },
  //     order: {
  //       created_at: 'DESC',
  //     },
  //     take,
  //     skip: (page - 1) * take,
  //   });

  //   const last_Page = Math.ceil(total / take);

  //   if (last_Page >= page) {
  //     return {
  //       data: requests,
  //       meta: {
  //         total,
  //         page: page <= 0 ? (page = 1) : page,
  //         last_Page: last_Page,
  //       },
  //     };
  //   } else {
  //     throw new NotFoundException('해당 페이지는 존재하지 않습니다');
  //   }
  // }

  async getRequests() {
    const value = await this.cacheManager.get(`all-requests`);

    if (!value) {
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
          reserved_begin_date: true,
          reserved_end_date: true,
          updated_at: true,
          detail: true,
          is_ongoing: true,
        },
        order: {
          created_at: 'DESC',
        },
      });
      await this.cacheManager.set(`all-requests`, request);

      return request;
    }
    return value;
  }

  async getRequestsPagination(page = 1, take = 8) {
    const value = await this.cacheManager.get(`RequestsPagination`);
    if (!value) {
      const requests = await this.requestsRepository
        .createQueryBuilder('r')
        .select()
        .leftJoin('r.user', 'user')
        .leftJoin('user.cats', 'cats')
        .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
        .orderBy('r.created_at', 'DESC')
        .skip((page - 1) * take)
        .take(take)
        .getMany();
      await this.cacheManager.set(`RequestsPagination`, requests);

      return requests;
    }
    return value;
  }

  async getRequestsByAddressBname(bname: string) {
    const request = await this.requestsRepository
      .createQueryBuilder('r')
      .select()
      .leftJoin('r.user', 'user')
      .leftJoin('user.cats', 'cats')
      .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
      .where('user.address_bname = :bname', { bname })
      .orderBy('r.created_at', 'DESC')
      .getMany();
    return request;
  }

  async getRequestsByAddressBnamePagination(bname: string, page = 1, take = 8) {
    // const value = await this.cacheManager.get(`AddressBname${bname}`);
    // if(!value){
    const requests = await this.requestsRepository
      .createQueryBuilder('r')
      .select()
      .leftJoin('r.user', 'user')
      .leftJoin('user.cats', 'cats')
      .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
      .where('user.address_bname = :bname', { bname })
      .orderBy('r.created_at', 'DESC')
      .skip((page - 1) * take)
      .take(take)
      .getMany();
    await this.cacheManager.set(`AddressBname${bname}`, requests);

    return requests;
    // }
    // return value;
  }

  async getRequestById(id: number) {
    const value = await this.cacheManager.get(`request${id}`);
    if (!value) {
      const request = await this.requestsRepository.find({
        where: { request_id: id },
        relations: {
          user: {
            cats: true,
          },
        },
        select: {
          user: {
            user_id: true,
            nickname: true,
            address_bname: true,
            cats: {
              name: true,
              age: true,
              gender: true,
              neutered: true,
              image: true,
              character: true,
            },
          },
          request_id: true,
          reserved_begin_date: true,
          reserved_end_date: true,
          detail: true,
          is_ongoing: true,
        },
      });
      await this.cacheManager.set(`request${id}`, request);
      if (_.isNil(request)) {
        throw new NotFoundException(`Request article not found. id: ${id}`);
      }
      return request;
    }
    return value;
  }

  async createRequest(id: number, bodyData: CreateRequestDto) {
    const { reserved_begin_date, reserved_end_date, detail } = bodyData;
    const newRequest = this.requestsRepository.create({
      user_id: id,
      reserved_begin_date,
      reserved_end_date,
      detail,
    });
    await this.cacheManager.del('/requests');
    return await this.requestsRepository.save(newRequest);
  }

  private async _existenceCheckById(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { request_id: id },
    });
    if (_.isNil(request)) {
      throw new NotFoundException(`Request article not found. id: ${id}`);
    }
    return request;
  }

  private async _authorCheckByUserId(authorId: number, userId: number) {
    if (authorId !== userId) {
      throw new UnauthorizedException(
        `Unauthorized. user id: ${userId} not match with author id: ${authorId}`
      );
    }
  }

  async updateRequestById(
    userId: number,
    id: number,
    bodyData: UpdateRequestDto
  ) {
    const request = await this._existenceCheckById(id);
    this._authorCheckByUserId(request.user_id, userId);

    const { reserved_begin_date, reserved_end_date, detail } = bodyData;

    // FIXME: reserved_begin_date, reserved_end_date 포함 detail까지 모두 입력해야 수정이 가능한 것으로 변경 확정하기
    // reserved_time을 업데이트 하지 않는 경우(detail만 입력된 경우)
    if (!reserved_begin_date) {
      throw new BadRequestException(
        `희망 시작 날짜가 유효하지 않습니다. 시작 날짜: ${reserved_begin_date}`
      );
    }
    if (!reserved_end_date) {
      throw new BadRequestException(
        `희망 끝 날짜가 유효하지 않습니다. 끝 날짜: ${reserved_end_date}`
      );
    }
    // detail값이 유효하지 않은 경우(reserved_time만 입력된 경우)
    if (!detail) {
      throw new BadRequestException(`상세 요청 형식이 유효하지 않습니다`);
    }
    // reserved_time과 detail 항목을 모두 업데이트
    await this.requestsRepository.update(id, {
      reserved_begin_date,
      reserved_end_date,
      detail,
    });
    await this.cacheManager.del('/requests');
  }

  async updateRequestIsOngoing(
    userId: number,
    id: number,
    bodyData: UpdateRequestDto
  ) {
    const request = await this._existenceCheckById(id);
    this._authorCheckByUserId(request.user_id, userId);
    this.requestsRepository.update(id, { is_ongoing: bodyData.is_ongoing });
    await this.cacheManager.del('/requests');
  }

  async deleteRequestById(userId: number, id: number) {
    const request = await this._existenceCheckById(id);
    this._authorCheckByUserId(request.user_id, userId);
    this.requestsRepository.softDelete(id);
    await this.cacheManager.del('/requests');
  }
}
