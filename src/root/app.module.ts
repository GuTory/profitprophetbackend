import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from '../stock/stock.controller';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [],
  controllers: [AppController, StockController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
