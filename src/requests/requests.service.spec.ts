import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';

describe('RequestsService', () => {
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestsService],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRequests', () => {
    it('should return an array', () => {
      const result = service.getRequests();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getRequestById', () => {
    // 해당 id가 없을 때 에러 메세지를 잘 던지는지 확인
    it('should thorw 404 error', () => {
      try {
        service.getRequestById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Request article nof found. id: 999`);
      }
    });
  });
});
