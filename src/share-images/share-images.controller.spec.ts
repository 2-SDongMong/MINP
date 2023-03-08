import { Test, TestingModule } from '@nestjs/testing';
import { ShareImagesController } from './share-images.controller';

describe('ShareImagesController', () => {
  let controller: ShareImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareImagesController],
    }).compile();

    controller = module.get<ShareImagesController>(ShareImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
