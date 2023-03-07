import { Test, TestingModule } from '@nestjs/testing';
import { ShareImagesService } from './share-images.service';

describe('ShareImagesService', () => {
  let service: ShareImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareImagesService],
    }).compile();

    service = module.get<ShareImagesService>(ShareImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
