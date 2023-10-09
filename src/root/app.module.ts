import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from '../stock/controller/stock.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { OneTimeService } from '../one-time/one-time.service';
import { StockService } from '../stock/service/stock.service';
import { StockHistoryController } from '../stock-history/stock-history.controller';

@Module({
  controllers: [AppController, StockController, StockHistoryController],
  imports: [],
  providers: [AppService, FirebaseService, OneTimeService, StockService],
})
export class AppModule {}
