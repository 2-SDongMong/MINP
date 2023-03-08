import { Test, TestingModule } from '@nestjs/testing';
import { CatLikesService } from './cat-likes.service';

describe('CatLikesService', () => {
  let service: CatLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatLikesService],
    }).compile();

    service = module.get<CatLikesService>(CatLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
