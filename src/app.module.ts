import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockDataReaderService } from './stock-data-reader/stock-data-reader.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StockDataReaderService],
})
export class AppModule {}
