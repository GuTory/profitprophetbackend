import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { UserInterface } from '../../../auth/model/user.interface';
import { FavoriteService } from '../favorite/favorite.service';
import { increment, updateDoc } from '@firebase/firestore';

@Injectable()
export class BalanceService {
  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
  ) {}

  async uploadMoney(value: number): Promise<UserInterface> {
    const user = await this.favoriteService.getUser(
      this.authService.getCurrentUser().email,
    );
    await user.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        balance: increment(value),
      });
    });
    const auth: UserInterface = await this.authService.authenticateUser(
      this.authService.getCurrentUser(),
    );
    console.log(auth.balance);
    return auth;
  }
}
