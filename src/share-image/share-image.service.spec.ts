import { Test, TestingModule } from '@nestjs/testing';
import { ShareImageService } from './share-image.service';

describe('ShareImageService', () => {
  let service: ShareImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareImageService],
    }).compile();

    service = module.get<ShareImageService>(ShareImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
