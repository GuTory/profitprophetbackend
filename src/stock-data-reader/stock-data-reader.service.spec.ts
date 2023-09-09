import { Test, TestingModule } from '@nestjs/testing';
import { StockDataReaderService } from './stock-data-reader.service';

describe('StockDataReaderService', () => {
  let service: StockDataReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockDataReaderService],
    }).compile();

    service = module.get<StockDataReaderService>(StockDataReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
