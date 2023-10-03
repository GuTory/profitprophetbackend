import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeService } from './one-time.service';

describe('OneTimeService', () => {
  let service: OneTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OneTimeService],
    }).compile();

    service = module.get<OneTimeService>(OneTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
