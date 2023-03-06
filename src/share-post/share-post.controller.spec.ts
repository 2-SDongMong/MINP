import { Test, TestingModule } from '@nestjs/testing';
import { SharePostController } from './share-post.controller';

describe('SharePostController', () => {
  let controller: SharePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharePostController],
    }).compile();

    controller = module.get<SharePostController>(SharePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
