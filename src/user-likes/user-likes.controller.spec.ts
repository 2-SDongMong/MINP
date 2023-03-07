import { Test, TestingModule } from '@nestjs/testing';
import { UserLikesController } from './user-likes.controller';

describe('UserLikesController', () => {
  let controller: UserLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLikesController],
    }).compile();

    controller = module.get<UserLikesController>(UserLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
