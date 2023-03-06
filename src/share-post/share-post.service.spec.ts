import { Test, TestingModule } from '@nestjs/testing';
import { SharePostService } from './share-post.service';

describe('SharePostService', () => {
  let service: SharePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharePostService],
    }).compile();

    service = module.get<SharePostService>(SharePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
