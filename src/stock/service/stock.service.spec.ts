import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { FirebaseService } from '../../common/service/firebase/firebase.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockService, FirebaseService],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return Apple stock', async () => {
    const stockMeta = await service.getStockByTicker('AAPL');
    expect(stockMeta).toBeDefined();
    expect(stockMeta).toEqual({
      Id: 'fJlTi68GlxDdBnIVc6QB',
      MarketCategory: 'Q',
      NextShares: 'N',
      SecurityName: 'Apple Inc. - Common Stock',
      NasdaqTraded: 'Y',
      TestIssue: 'N',
      Symbol: 'AAPL',
      RoundLotSize: 100,
      ETF: 'N',
      CQSSymbol: null,
      FinancialStatus: 'N',
      NASDAQSymbol: 'AAPL',
      ListingExchange: 'Q',
    });
  });
  it('should return Hewlett-Packard stock', async () => {
    const stockMeta = await service.getStockByTicker('HPQ');
    expect(stockMeta).toBeDefined();
    expect(stockMeta).toEqual({
      Id: 'aURF6EAsE4IlRjiJqeCx',
      MarketCategory: ' ',
      NextShares: 'N',
      SecurityName: 'HP Inc. Common Stock',
      NasdaqTraded: 'Y',
      TestIssue: 'N',
      Symbol: 'HPQ',
      RoundLotSize: 100,
      ETF: 'N',
      CQSSymbol: 'HPQ',
      FinancialStatus: null,
      NASDAQSymbol: 'HPQ',
      ListingExchange: 'N',
    });
  });
  it('should return nothing', async () => {
    const stockMeta = await service.getStockByTicker('AAPPL');
    expect(stockMeta).not.toBeUndefined();
    expect(stockMeta).toEqual(null);
  });
  it('should return pagesize amount of stocks', async () => {
    const stocks = await service.getStocksByPage();
    expect(stocks).toBeDefined();
    expect(stocks.length).toEqual(service.getPageSize());
    //this only works for pagesize of 5
    expect(stocks[0].Symbol).toEqual('A');
    expect(stocks[1].Symbol).toEqual('AA');
    expect(stocks[2].Symbol).toEqual('AAAU');
    expect(stocks[3].Symbol).toEqual('AACG');
    expect(stocks[4].Symbol).toEqual('AADR');
  });
  it('should return next page of stocks', async () => {
    const stockFirstPage = await service.getStocksByPage();
    expect(stockFirstPage).toBeDefined();
    expect(stockFirstPage.length).toEqual(service.getPageSize());
    const stocksNextPage = await service.getStocksByNextPage();
    expect(stocksNextPage).toBeDefined();
    expect(stocksNextPage.length).toEqual(service.getPageSize());
    //this only works for pagesize of 5
    expect(stocksNextPage[0].Symbol).toEqual('AAL');
    expect(stocksNextPage[1].Symbol).toEqual('AAMC');
    expect(stocksNextPage[2].Symbol).toEqual('AAME');
    expect(stocksNextPage[3].Symbol).toEqual('AAN');
    expect(stocksNextPage[4].Symbol).toEqual('AAOI');
  });
  it('should return previous page of stocks', async () => {
    const stockFirstPage = await service.getStocksByPage();
    expect(stockFirstPage).toBeDefined();
    const stockNextPage = await service.getStocksByNextPage();
    expect(stockNextPage).toBeDefined();
    const stockPreviousPage = await service.getStocksByPrevPage();
    expect(stockPreviousPage).toBeDefined();
    //this only works for pagesize of 5
    expect(stockPreviousPage[0].Symbol).toEqual('A');
    expect(stockPreviousPage[1].Symbol).toEqual('AA');
    expect(stockPreviousPage[2].Symbol).toEqual('AAAU');
    expect(stockPreviousPage[3].Symbol).toEqual('AACG');
    expect(stockPreviousPage[4].Symbol).toEqual('AADR');
  });
});
