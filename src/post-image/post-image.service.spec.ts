import { Test, TestingModule } from '@nestjs/testing';
import { PostImageService } from './post-image.service';

describe('PostImageService', () => {
  let service: PostImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostImageService],
    }).compile();

    service = module.get<PostImageService>(PostImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
