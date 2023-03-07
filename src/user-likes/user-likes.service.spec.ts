import { Test, TestingModule } from '@nestjs/testing';
import { UserLikesService } from './user-likes.service';

describe('UserLikesService', () => {
  let service: UserLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLikesService],
    }).compile();

    service = module.get<UserLikesService>(UserLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
