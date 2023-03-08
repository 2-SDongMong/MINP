import { Test, TestingModule } from '@nestjs/testing';
import { ShareCommentsController } from './share-comments.controller';

describe('ShareCommentsController', () => {
  let controller: ShareCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareCommentsController],
    }).compile();

    controller = module.get<ShareCommentsController>(ShareCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
