import { Body, Controller, Param, Put } from '@nestjs/common';
import { FavoriteService } from '../service/favorite.service';
import { UserInterface } from 'src/auth/model/user.interface';

@Controller('operation')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Put('/favorite/add/:ticker')
  public async addFavorite(
    @Body() user: UserInterface,
    @Param('ticker') stockAdded: string,
  ) {
    console.log(stockAdded + ' added');
    return await this.favoriteService.addFavorite(
      user,
      stockAdded.toUpperCase(),
    );
  }

  @Put('/favorite/remove/:ticker')
  public async removeFavorite(
    @Body() user: UserInterface,
    @Param('ticker') stockRemoved: string,
  ) {
    console.log(stockRemoved + ' removed');
    return await this.favoriteService.removeFavorite(
      user,
      stockRemoved.toUpperCase(),
    );
  }
}
