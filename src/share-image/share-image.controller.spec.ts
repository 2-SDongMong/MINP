import { Test, TestingModule } from '@nestjs/testing';
import { ShareImageController } from './share-image.controller';

describe('ShareImageController', () => {
  let controller: ShareImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareImageController],
    }).compile();

    controller = module.get<ShareImageController>(ShareImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
