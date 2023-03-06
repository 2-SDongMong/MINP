import { Test, TestingModule } from '@nestjs/testing';
import { CatLikeController } from './cat-like.controller';

describe('CatLikeController', () => {
  let controller: CatLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatLikeController],
    }).compile();

    controller = module.get<CatLikeController>(CatLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
