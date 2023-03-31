import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import {
  getRequestsByCursorSample,
  getRequestsByBnameAndCursorSample,
  getRequestByIdSample,
  createRequestSample,
  mockRequestsService,
} from './mock-data';

const mockReq = {
  userId: 1,
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

  // 동네명 없이 전체 조회 테스트
  describe('getRequestsByCursor', () => {
    it('should return first page(endCursor "null"), 9 data from all requests', async () => {
      expect(controller.getRequestsByCursor(null)).resolves.toEqual(
        getRequestsByCursorSample
      );
      expect(mockRequestsService.getRequestsByCursor).toHaveBeenCalledTimes(1);
      expect(mockRequestsService.getRequestsByCursor).toHaveBeenCalledWith(
        null
      );
    });
  });

  // 동네명으로 전체 조회 테스트
  describe('getRequestsByBnameANdcursor', () => {
    it('should return first page(endCursor "null"), 9 data with bname "구로동"', async () => {
      expect(
        controller.getRequestsByBnameAndCursor('구로동', null)
      ).resolves.toEqual(getRequestsByBnameAndCursorSample);

      expect(
        mockRequestsService.getRequestsByBnameAndCursor
      ).toHaveBeenCalledTimes(1);
      expect(
        mockRequestsService.getRequestsByBnameAndCursor
      ).toHaveBeenCalledWith('구로동', null);
    });
  });

  // ID로 상세 조회 테스트
  describe('getRequestById', () => {
    it('should get the request with ID: 26', async () => {
      const requestId = 26;

      expect(controller.getRequestById(requestId)).resolves.toEqual([
        {
          ...getRequestByIdSample[0],
          request_id: 26,
        },
      ]);

      expect(mockRequestsService.getRequestById).toHaveBeenCalledTimes(1);
      expect(mockRequestsService.getRequestById).toHaveBeenCalledWith(
        requestId
      );
    });
  });

  // 생성 테스트
  describe('createRequest', () => {
    // 성공 케이스
    it('should create a request', async () => {
      const dto = {
        reserved_begin_date: new Date('2023-05-05'),
        reserved_end_date: new Date('2023-05-05'),
        detail: '어린이날 냥품 구할 수 있을까요',
      };

      expect(controller.createRequest(mockReq, dto)).resolves.toEqual({
        ...createRequestSample,
        request_id: expect.any(Number),
        user_id: mockReq.userId,
        ...dto,
      });

      expect(mockRequestsService.createRequest).toHaveBeenCalledWith(
        mockReq.userId,
        dto
      );
    });

    // FIXME: service.spec.ts에서 검사하기(?)
    // // 에러 케이스:
    // // 주어진 dto의 'detail' 항목이 빈 문자열이면 BadRequestException을 1번 던져야 함.
    // it('should throw BadRequestException when given body data is invalid', async () => {
    //   const dto = {
    //     reserved_begin_date: new Date('2023-05-05'),
    //     reserved_end_date: new Date('2023-05-05'),
    //     detail: '',
    //   };

    //   expect.assertions(1);
    //   expect(() => controller.createRequest(mockReq, dto)).rejects.toThrow(
    //     BadRequestException
    //   );
    // });
  });

  // 수정 테스트
  // TODO: userId로 작성자 본인인지 검사를 통과하도록 만들기.
  describe('updateRequest', () => {
    it('should update the request of id: 77', async () => {
      const requestId = 77;
      const dto = {
        reserved_begin_date: new Date('2023-04-01'),
        reserved_end_date: new Date('2023-04-01'),
        detail: '이웃 집사님들 냥품 구합니다!',
      };

      controller.updateRequestById(mockReq, requestId, dto);
      expect(controller.getRequestById(requestId)).resolves.toEqual([
        {
          ...getRequestByIdSample[0],
          ...dto,
        },
      ]);

      expect(mockRequestsService.updateRequestById).toHaveBeenCalledTimes(1);
      expect(mockRequestsService.updateRequestById).toHaveBeenCalledWith(
        mockReq.userId,
        requestId,
        dto
      );
    });
  });

  // 품앗이 '모집중' 수정 테스트
  describe('updateRequestIsOngoing', () => {
    it('should update "is_ongoing" status from "true" to "false"', async () => {
      const requestId = 77;
      const dto = {
        is_ongoing: false,
      };

      controller.updateRequestIsOngoing(mockReq, requestId, dto);
      expect(controller.getRequestById(requestId)).resolves.toEqual([
        {
          ...getRequestByIdSample[0],
          ...dto,
        },
      ]);

      expect(mockRequestsService.updateRequestIsOngoing).toHaveBeenCalledTimes(
        1
      );
      expect(mockRequestsService.updateRequestIsOngoing).toHaveBeenCalledWith(
        mockReq.userId,
        requestId,
        dto
      );
    });
  });

  // 삭제 테스트
  // TODO: userId로 작성자 본인인지 검사를 통과하도록 만들기.
  describe('deleteRequest', () => {
    it('should delete the request with id: 1', () => {
      const requestId = 1;

      expect(controller.deleteRequestById(mockReq, requestId)).toEqual(
        undefined
      );
      expect(mockRequestsService.deleteRequestById).toHaveBeenCalledWith(
        mockReq.userId,
        requestId
      );
    });
  });
});
