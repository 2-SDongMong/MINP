import { Test, TestingModule } from '@nestjs/testing';
import { SharePostsService } from './share-posts.service';

describe('SharePostsService', () => {
  let service: SharePostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharePostsService],
    }).compile();

    service = module.get<SharePostsService>(SharePostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
