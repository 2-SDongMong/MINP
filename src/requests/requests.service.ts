import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
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

  // 직전 페이지의 마지막 인덱스 endCursor와 페이지 당 게시글 수 take를 받아 품앗이 목록 조회
  async getRequestsByCursor(endCursor?: number, take: number = 9) {
    const isFirstPage = !endCursor;

    const [requests, total] = await this.requestsRepository.findAndCount({
      take,
      where: !isFirstPage ? { request_id: LessThan(endCursor) } : null,
      relations: {
        user: {
          cats: true,
        },
      },
      select: {
        user: {
          nickname: true,
          address_bname: true,
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
        request_id: 'DESC',
      },
    });

    let newEndCursor = requests[requests.length - 1]?.request_id ?? false;
    let startCursor = requests[0]?.request_id ?? false;
    let hasPreviousPage = total >= take;
    let hasNextPage = hasPreviousPage ? requests.length > take : true;

    return {
      data: requests,
      pageOpt: {
        total,
        take,
        endCursor: newEndCursor,
        startCursor,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  // 동네명 bname과 직전 페이지의 마지막 인덱스 endCursor, 페이지당 표시할 게시글 수 take로 품앗이 목록 조회
  async getRequestsByBnameAndCursor(
    bname: string,
    endCursor?: number,
    take: number = 9
  ) {
    const isFirstPage = !endCursor;

    let requestsQuery = this.requestsRepository
      .createQueryBuilder('r')
      .select()
      .leftJoin('r.user', 'user')
      .leftJoin('user.cats', 'cats')
      .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
      .where('user.address_bname = :bname', { bname });
    if (!isFirstPage) {
      requestsQuery = requestsQuery.andWhere('r.request_id < :endCursor', {
        endCursor,
      });
    }
    const requests = await requestsQuery
      .orderBy('r.created_at', 'DESC')
      .take(take)
      .getMany();

    let newEndCursor = requests[requests.length - 1]?.request_id ?? false; // 67 -> 49 -> 13
    let startCursor = requests[0]?.request_id ?? false;

    return {
      data: requests,
      pageOpt: {
        take,
        endCursor: newEndCursor,
        startCursor,
      },
    };
  }

  // FIXME: 커서 기반에 문제가 생겼을 시, 오프셋 기반으로 전환할 것.

  // // 페이지 번호와 페이지당 게시글 수를 받아 목록 조회
  // async getRequestsPagination(page = 1, take = 8) {
  //   const value = await this.cacheManager.get(`RequestsPagination`);
  //   if (!value) {
  //     const requests = await this.requestsRepository
  //       .createQueryBuilder('r')
  //       .select()
  //       .leftJoin('r.user', 'user')
  //       .leftJoin('user.cats', 'cats')
  //       .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
  //       .orderBy('r.created_at', 'DESC')
  //       .skip((page - 1) * take)
  //       .take(take)
  //       .getMany();
  //     await this.cacheManager.set(`RequestsPagination`, requests);

  //     return requests;
  //   }
  //   return value;
  // }

  // // 동네명으로 품앗이 전체 목록 조회
  // async getRequestsByAddressBname(bname: string) {
  //   const request = await this.requestsRepository
  //     .createQueryBuilder('r')
  //     .select()
  //     .leftJoin('r.user', 'user')
  //     .leftJoin('user.cats', 'cats')
  //     .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
  //     .where('user.address_bname = :bname', { bname })
  //     .orderBy('r.created_at', 'DESC')
  //     .getMany();
  //   return request;
  // }

  // // 동네명 bname과 페이지 번호 page, 페이지당 표시할 게시글 수 take로 품앗이 목록 조회
  // async getRequestsByAddressBnamePagination(bname: string, page = 1, take = 8) {
  //   // const value = await this.cacheManager.get(`AddressBname${bname}`);
  //   // if(!value){
  //   const requests = await this.requestsRepository
  //     .createQueryBuilder('r')
  //     .select()
  //     .leftJoin('r.user', 'user')
  //     .leftJoin('user.cats', 'cats')
  //     .addSelect(['user.nickname', 'user.address_bname', 'cats.image'])
  //     .where('user.address_bname = :bname', { bname })
  //     .orderBy('r.created_at', 'DESC')
  //     .skip((page - 1) * take)
  //     .take(take)
  //     .getMany();
  //   await this.cacheManager.set(`AddressBname${bname}`, requests);

  //   return requests;
  //   // }
  //   // return value;
  // }

  // 품앗이 ID로 게시글 하나 조회
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

  // 품앗이 게시글 생성
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

  // 주어진 ID에 해당하는 게시글이 존재하는지 검사 후 해당 게시글 반환
  private async _existenceCheckById(id: number) {
    const request = await this.requestsRepository.findOne({
      where: { request_id: id },
    });
    if (_.isNil(request)) {
      throw new NotFoundException(`Request article not found. id: ${id}`);
    }
    return request;
  }

  // 게시글 작성자 ID와 로그인 사용자 ID가 같지 않다면 401 Unaurhotrized Exception 반환
  private async _authorCheckByUserId(authorId: number, userId: number) {
    if (authorId !== userId) {
      throw new UnauthorizedException(
        `Unauthorized. user id: ${userId} not match with author id: ${authorId}`
      );
    }
  }

  // ID로 게시글 업데이트
  async updateRequestById(
    userId: number,
    id: number,
    bodyData: UpdateRequestDto
  ) {
    const request = await this._existenceCheckById(id);
    this._authorCheckByUserId(request.user_id, userId);

    const { reserved_begin_date, reserved_end_date, detail } = bodyData;

    // 400 Exception: reserved_begin_date 입력 데이터가 제대로 들어오지 않은 경우
    if (!reserved_begin_date) {
      throw new BadRequestException(
        `희망 시작 날짜가 유효하지 않습니다. 시작 날짜: ${reserved_begin_date}`
      );
    }

    // 400 Exception: reserved_end_date 입력 데이터가 제대로 들어오지 않은 경우
    if (!reserved_end_date) {
      throw new BadRequestException(
        `희망 끝 날짜가 유효하지 않습니다. 끝 날짜: ${reserved_end_date}`
      );
    }

    // 400 Exception: detail값이 유효하지 않은 경우
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
