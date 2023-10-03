import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from '../stock/stock.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { OneTimeService } from '../one-time/one-time.service';

@Module({
  imports: [],
  controllers: [AppController, StockController],
  providers: [AppService, FirebaseService, OneTimeService],
})
export class AppModule {}
