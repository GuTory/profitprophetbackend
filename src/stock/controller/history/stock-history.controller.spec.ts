import { Test, TestingModule } from '@nestjs/testing';
import { StockHistoryController } from './stock-history.controller';

describe('StockHistoryController', () => {
  let controller: StockHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockHistoryController],
    }).compile();

    controller = module.get<StockHistoryController>(StockHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
