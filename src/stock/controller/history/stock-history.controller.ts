import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import * as fs from 'fs';

@Controller('stockhistory')
export class StockHistoryController {
  @Get(':ticker')
  getStockByTicker(@Param('ticker') ticker: string): JSON {
    try {
      return JSON.parse(
        fs.readFileSync('./assets/stocks/' + ticker + '.json', 'utf-8'),
      );
    } catch (err) {
      throw new NotFoundException({ errorMessage: 'Ticker not found' });
    }
  }
}
