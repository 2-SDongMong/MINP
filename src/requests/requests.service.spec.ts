import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { Request } from './request.entity';
import { UpdateResult } from 'typeorm';

const getRequestsSample = [
  {
    request_id: 9,
    reserved_time: '2023-03-10',
    user: {
      nickname: 'Nick',
      cats: [],
    },
  },
  {
    request_id: 10,
    reserved_time: '2023-03-09',
    user: {
      nickname: 'Nick',
      cats: [],
    },
  },
  {
    request_id: 26,
    reserved_time: '2023-03-31',
    user: {
      nickname: 'Nick Again4',
      cats: [],
    },
  },
];

const getRequestByIdSample = {
  request_id: 26,
  detail: '하루 낮 냥품 요청해요!',
  reserved_time: '2023-03-31',
  user: {
    nickname: 'Nick Again4',
    cats: [],
  },
};

const createRequestSample = {
  user_id: 1,
  detail: '냥품 신청합니다',
  reserved_time: '2023-05-05',
  deleted_at: null,
  request_id: 26,
  created_at: '2023-03-11T04:46:27.466Z',
  updated_at: '2023-03-11T04:46:27.466Z',
};

const mockRequestsRepository = {
  find: jest.fn(() => getRequestsSample),
  findOne: jest.fn((options) => getRequestByIdSample),
  create: jest.fn((dto) => createRequestSample),
  save: jest.fn((request) =>
    Promise.resolve({
      ...request,
      request_id: 26,
    })
  ),
  update: jest.fn((requestId, dto) => Promise<UpdateResult>),
  softDelete: jest.fn((requestId) => Promise<UpdateResult>),
};

describe('RequestsService', () => {
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: getRepositoryToken(Request),
          useValue: mockRequestsRepository,
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 전체 조회 테스트
  describe('getRequests', () => {
    it('should return all requests', async () => {
      expect(service.getRequests()).resolves.toEqual(getRequestsSample);
      expect(mockRequestsRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // ID로 상세 조회 테스트
  describe('getRequestById', () => {
    it('should get the request with ID: 26', async () => {
      const requestId = 26;

      expect(service.getRequestById(requestId)).resolves.toEqual(
        getRequestByIdSample
      );

      expect(mockRequestsRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  // 생성 테스트
  describe('createRequest', () => {
    // 성공 케이스
    it('should create a request and return that', async () => {
      const userId = 1;
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '냥품 신청합니다',
      };

      expect(service.createRequest(userId, dto)).resolves.toEqual({
        ...createRequestSample,
        ...dto,
        user_id: userId,
        reserved_time: dto.reserved_time.toJSON().split('T')[0],
      });

      // 아래의 4개의 테스트는 하지 않는 것이 좋다 (참고용으로 남겨둠)
      expect(mockRequestsRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRequestsRepository.create).toHaveBeenCalledWith({
        ...dto,
        user_id: userId,
      });
      expect(mockRequestsRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRequestsRepository.save).toHaveBeenCalledWith(
        createRequestSample
      );
    });
  });

  // 수정 테스트
  describe('updateRequestById', () => {
    it('should update the request of id: 1 with given dto: { reserved_time: "2023-05-05", detail: "냥품 신청합니다" }', () => {
      const requestId = 1;
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '냥품 신청합니다',
      };

      expect(service.updateRequestById(requestId, dto)).resolves.toEqual(
        undefined
      );
      expect(mockRequestsRepository.update).toHaveBeenCalledWith(
        requestId,
        dto
      );
    });

    // TODO: 에러 케이스:
    // 주어진 ID로 검색한 결과값이 null이라면 NotFoundException 던져야 함.
    // it('should throw NotFoundException when no message is found with given ID', async () => {
    //   const userId = -1;
    //   mockRequestsRepository.findOne = jest.fn((options) => null); // 이게 왜 에러를 안 던지지?
    //   const dto = {
    //     reserved_time: new Date('2023-05-05'),
    //     detail: '',
    //   };

    //   expect.assertions(1);

    //   expect(() => service.updateRequestById(userId, dto)).rejects.toThrow(
    //     NotFoundException
    //   );
    //   expect(mockRequestsRepository.findOne).toHaveBeenCalledTimes(1);
    // });
  });

  // 삭제 테스트
  describe('deleteRequestById', () => {
    it('should delete the request with id: 1', () => {
      const requestId = 1;

      expect(service.deleteRequestById(requestId)).toEqual(undefined);
      expect(mockRequestsRepository.softDelete).toHaveBeenCalledWith(requestId);
    });
  });
});
