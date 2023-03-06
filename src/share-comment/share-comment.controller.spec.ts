import { Test, TestingModule } from '@nestjs/testing';
import { ShareCommentController } from './share-comment.controller';

describe('ShareCommentController', () => {
  let controller: ShareCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareCommentController],
    }).compile();

    controller = module.get<ShareCommentController>(ShareCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
