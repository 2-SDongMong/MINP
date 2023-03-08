import { Test, TestingModule } from '@nestjs/testing';
import { PostImagesController } from './post-images.controller';

describe('PostImagesController', () => {
  let controller: PostImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostImagesController],
    }).compile();

    controller = module.get<PostImagesController>(PostImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
