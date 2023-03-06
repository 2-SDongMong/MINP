import { Test, TestingModule } from '@nestjs/testing';
import { ShareCommentService } from './share-comment.service';

describe('ShareCommentService', () => {
  let service: ShareCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareCommentService],
    }).compile();

    service = module.get<ShareCommentService>(ShareCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
