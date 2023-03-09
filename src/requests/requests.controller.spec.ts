import { Test, TestingModule } from '@nestjs/testing';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('RequestsController', () => {
  let controller: RequestsController;
  let service: RequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [RequestsService],
    })
      // RequestsService 특정 mock 만들기. jest.fn()이용.
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === RequestsService) {
          return { getRequests: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<RequestsController>(RequestsController);
    service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // "Isolated testing" (의존성을 가짜로 직접 주입해서 따로따로 테스트하기)
  // beforeEach(() => {
  //   catsService = new CatsService();
  //   catsController = new CatsController(catsService);
  // });
  describe('findAll', () => {
    it('shoul dreturn an array of requests', async () => {
      const result = ['test'];
      jest.spyOn(service, 'getRequests').mockImplementation(() => result);

      expect(await controller.getRequests()).toBe(result);
    });
  });
});
