import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock/controller/meta/stock.controller';
import { FirebaseService } from './common/service/firebase/firebase.service';
import { StockService } from './stock/service/stock.service';
import { StockHistoryController } from './stock/controller/history/stock-history.controller';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/service/auth/auth.service';
import { FavoriteController } from './operation/controller/favorite/favorite.controller';
import { FavoriteService } from './operation/service/favorite/favorite.service';
import { PredictionController } from './prediction/controller/prediction.controller';
import { PredictionService } from './prediction/service/prediction.service';
import { BalanceController } from './operation/controller/balance/balance.controller';
import { BalanceService } from './operation/service/balance/balance.service';

@Module({
  controllers: [
    AppController,
    StockController,
    StockHistoryController,
    AuthController,
    FavoriteController,
    PredictionController,
    BalanceController,
  ],
  imports: [],
  providers: [
    AppService,
    FirebaseService,
    StockService,
    AuthService,
    FavoriteService,
    PredictionService,
    BalanceService,
  ],
})
export class AppModule {}
