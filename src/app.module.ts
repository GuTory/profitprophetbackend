import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock/controller/meta/stock.controller';
import { FirebaseService } from './auth/service/firebase/firebase.service';
import { StockService } from './stock/service/stock.service';
import { StockHistoryController } from './stock/controller/history/stock-history.controller';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth/auth.service';

@Module({
  controllers: [
    AppController,
    StockController,
    StockHistoryController,
    AuthController,
  ],
  imports: [],
  providers: [AppService, FirebaseService, StockService, AuthService],
})
export class AppModule {}