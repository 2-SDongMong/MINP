import { Test, TestingModule } from '@nestjs/testing';
import { PostImageController } from './post-image.controller';

describe('PostImageController', () => {
  let controller: PostImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostImageController],
    }).compile();

    controller = module.get<PostImageController>(PostImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
