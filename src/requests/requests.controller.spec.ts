import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { sample } from 'rxjs';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

const mockReq = {
  user: 1,
};

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
  user_id: 30,
  detail: '냥품 신청합니다',
  reserved_time: '2023-05-05',
  deleted_at: null,
  request_id: 26,
  created_at: '2023-03-11T04:46:27.466Z',
  updated_at: '2023-03-11T04:46:27.466Z',
};

const mockRequestsService = {
  getRequests: jest.fn(() => getRequestsSample),
  getRequestById: jest.fn((requestId) => {
    return {
      ...getRequestByIdSample,
      request_id: requestId,
    };
  }),
  createRequest: jest.fn((req, dto) => {
    return {
      ...createRequestSample,
      user_id: 1,
      ...dto,
    };
  }),
  updateRequestById: jest.fn((requestId, dto) => undefined),
  deleteRequestById: jest.fn((requestId) => undefined),
};

describe('RequestsController', () => {
  let controller: RequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [RequestsService],
    })
      .overrideProvider(RequestsService)
      .useValue(mockRequestsService)
      .compile();

    controller = module.get<RequestsController>(RequestsController);
  });

  // 단위 테스트 대상인 RequestController가 잘 정의되어 있는가
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ID로 상세 조회 테스트
  describe('getRequestById', () => {
    it('should get the request with ID: 26', async () => {
      const requestId = 26;

      expect(controller.getRequestById(requestId)).resolves.toEqual({
        ...getRequestByIdSample,
        request_id: 26,
      });

      expect(mockRequestsService.getRequestById).toHaveBeenCalledWith(
        requestId
      );
    });
  });

  // 전체 조회 테스트
  describe('getRequests', () => {
    it('should return all requests', async () => {
      expect(controller.getRequests()).resolves.toEqual(getRequestsSample);
      expect(mockRequestsService.getRequests).toHaveBeenCalledTimes(1);
    });
  });

  // 생성 테스트
  describe('createRequest', () => {
    // 성공 케이스
    it('should create a request', async () => {
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '냥품 신청합니다',
      };

      expect(controller.createRequest(mockReq, dto)).resolves.toEqual({
        ...createRequestSample,
        request_id: expect.any(Number),
        user_id: mockReq.user,
        ...dto,
      });

      expect(mockRequestsService.createRequest).toHaveBeenCalledWith(
        mockReq.user,
        dto
      );
    });

    // 에러 케이스:
    // 주어진 dto의 'detail' 항목이 빈 문자열이면 BadRequestException을 1번 던져야 함.
    it('should throw BadRequestException when given body data is invalid', async () => {
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '',
      };

      expect.assertions(1);
      expect(() => controller.createRequest(mockReq, dto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  // 수정 테스트
  describe('updateRequest', () => {
    it('should update the request of id: 1 with given dto: { reserved_time: "2023-05-05", detail: "냥품 신청합니다" }', () => {
      const requestId = 1;
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '냥품 신청합니다',
      };

      expect(controller.updateRequestById(requestId, dto)).toEqual(undefined);
      expect(mockRequestsService.updateRequestById).toHaveBeenCalledWith(
        requestId,
        dto
      );
    });
  });

  // 삭제 테스트
  describe('deleteRequest', () => {
    it('should delete the request with id: 1', () => {
      const requestId = 1;

      expect(controller.deleteRequestById(requestId)).toEqual(undefined);
      expect(mockRequestsService.deleteRequestById).toHaveBeenCalledWith(
        requestId
      );
    });
  });
});
