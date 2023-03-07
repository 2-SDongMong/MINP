import { Test, TestingModule } from '@nestjs/testing';
import { ShareCommentsService } from './share-comments.service';

describe('ShareCommentsService', () => {
  let service: ShareCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareCommentsService],
    }).compile();

    service = module.get<ShareCommentsService>(ShareCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
