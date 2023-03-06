import { Test, TestingModule } from '@nestjs/testing';
import { CatLikeService } from './cat-like.service';

describe('CatLikeService', () => {
  let service: CatLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatLikeService],
    }).compile();

    service = module.get<CatLikeService>(CatLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
