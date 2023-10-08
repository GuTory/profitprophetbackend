import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { StockService } from '../service/stock.service';
import { StockMeta } from '../../models/stock.meta';

@Controller('stockmeta')
export class StockController {
  constructor(private StockService: StockService) {}

  @Get('/search/:ticker')
  async getStockByTicker(@Param('ticker') ticker: string) {
    return (
      (await this.StockService.getStockByTicker(ticker)) ??
      new BadRequestException('No stock found with this symbol')
    );
  }

  @Get('page/')
  async getStocksByPage() {
    return await this.StockService.getStocksByPage();
  }

  @Get('page/:direction')
  async getStocksByDirection(@Param('direction') direction: 'next' | 'prev') {
    let res: StockMeta[] = [];
    switch (direction) {
      case 'next':
        res = await this.StockService.getStocksByNextPage();
        break;
      case 'prev':
        res = await this.StockService.getStocksByPrevPage();
        break;
      default:
        new BadRequestException('Bad direction parameter');
        break;
    }
    return res ?? new BadRequestException('Bad paging request');
  }
}
