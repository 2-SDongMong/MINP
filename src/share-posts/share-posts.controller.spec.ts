import { Test, TestingModule } from '@nestjs/testing';
import { SharePostsController } from './share-posts.controller';

describe('SharePostsController', () => {
  let controller: SharePostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharePostsController],
    }).compile();

    controller = module.get<SharePostsController>(SharePostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
