export class StockMeta {
  Id: string;
  MarketCategory: string;
  NextShares: string;
  SecurityName: string;
  NasdaqTraded: string;
  TestIssue: string;
  Symbol: string;
  RoundLotSize: number;
  ETF: string;
  CQSSymbol: string;
  FinancialStatus: string;
  NASDAQSymbol: string;
  ListingExchange: string;

  constructor(id: string, obj: object) {
    this.Id = id;
    this.MarketCategory = obj['Market Category'];
    this.NextShares = obj['NextShares'];
    this.SecurityName = obj['Security Name'];
    this.NasdaqTraded = obj['Nasdaq Traded'];
    this.TestIssue = obj['Test Issue'];
    this.Symbol = obj['Symbol'];
    this.RoundLotSize = obj['Round Lot Size'];
    this.ETF = obj['ETF'];
    this.CQSSymbol = obj['CQS Symbol'];
    this.FinancialStatus = obj['Financial Status'];
    this.NASDAQSymbol = obj['NASDAQ Symbol'];
    this.ListingExchange = obj['Listing Exchange'];
  }
}
