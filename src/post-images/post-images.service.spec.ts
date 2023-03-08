import { Test, TestingModule } from '@nestjs/testing';
import { PostImagesService } from './post-images.service';

describe('PostImagesService', () => {
  let service: PostImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostImagesService],
    }).compile();

    service = module.get<PostImagesService>(PostImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
