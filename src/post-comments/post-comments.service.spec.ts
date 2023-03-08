import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentsService } from './post-comments.service';

describe('PostCommentsService', () => {
  let service: PostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostCommentsService],
    }).compile();

    service = module.get<PostCommentsService>(PostCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
