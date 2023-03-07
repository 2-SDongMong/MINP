import { Test, TestingModule } from '@nestjs/testing';
import { CatLikesController } from './cat-likes.controller';

describe('CatLikesController', () => {
  let controller: CatLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatLikesController],
    }).compile();

    controller = module.get<CatLikesController>(CatLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
