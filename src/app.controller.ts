import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StockDataReaderService } from './stock-data-reader/stock-data-reader.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private stockReaderService: StockDataReaderService,
  ) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/py')
  async helloPath(): Promise<string> {
    return await this.stockReaderService.getStockData().then((data: string) => {
      return data;
    });
  }
}
