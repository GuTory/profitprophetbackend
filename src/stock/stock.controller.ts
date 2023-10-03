import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import * as fs from 'fs';

@Controller('stock')
export class StockController {
  @Get(':ticker')
  getStockByTicker(@Param('ticker') ticker: string): JSON {
    try {
      console.log('getting ' + ticker);
      return JSON.parse(
        fs.readFileSync('./assets/stocks/' + ticker + '.json', 'utf-8'),
      );
    } catch (err) {
      throw new HttpException(
        { errorMessage: 'Ticker not found' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
