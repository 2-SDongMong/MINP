import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { Request } from './request.entity';
import {
  getRequestByIdSample,
  getRequestsSample,
  createRequestSample,
  mockRequestsRepository,
} from './mock-data';

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
  // TODO: userId로 작성자 본인인지 검사를 통과하도록 만들기. (현재 테스트 실패)
  describe('updateRequestById', () => {
    it('should update the request of id: 26 with given dto: { reserved_time: "2023-05-05", detail: "냥품 신청합니다" }', () => {
      const requestId = 26;
      const dto = {
        reserved_time: new Date('2023-05-05'),
        detail: '냥품 신청합니다',
      };

      expect(
        service.updateRequestById(undefined, requestId, dto)
      ).resolves.toEqual(undefined);
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
  // TODO: userId로 작성자 본인인지 검사를 통과하도록 만들기. (현재 테스트 실패)
  describe('deleteRequestById', () => {
    it('should delete the request with id: 1', () => {
      const requestId = 26;

      expect(service.deleteRequestById(undefined, requestId)).toEqual(
        undefined
      );
      expect(mockRequestsRepository.softDelete).toHaveBeenCalledWith(requestId);
    });
  });
});
