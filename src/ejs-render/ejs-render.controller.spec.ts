import { Test, TestingModule } from '@nestjs/testing';
import { EjsRenderController } from './ejs-render.controller';

describe('EjsRenderController', () => {
  let controller: EjsRenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjsRenderController],
    }).compile();

    controller = module.get<EjsRenderController>(EjsRenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
