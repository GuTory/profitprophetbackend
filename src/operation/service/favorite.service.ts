import {
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../common/service/firebase/firebase.service';
import { UserInterface } from '../../auth/model/user.interface';
import { AuthService } from '../../auth/service/auth/auth.service';

@Injectable()
export class FavoriteService {
  private readonly collection;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) {
    this.collection = collection(this.firebaseService.getFirestore(), 'users');
  }
  async addFavorite(user: UserInterface, StockAdded: string) {
    const fetchedUser = await this.getUser(user);
    await fetchedUser.forEach(async (doc) => {
      if ((doc.data() as UserInterface).favoriteStocks.includes(StockAdded)) {
        return;
      }
      updateDoc(doc.ref, {
        favoriteStocks: [
          ...(doc.data() as UserInterface).favoriteStocks,
          StockAdded,
        ],
      });
    });
    return await this.authService.authenticateUser(user);
  }
  async removeFavorite(user: UserInterface, StockRemoved: string) {
    const fetchedUser = await this.getUser(user);
    await fetchedUser.forEach(async (doc) => {
      updateDoc(doc.ref, {
        favoriteStocks: (doc.data() as UserInterface).favoriteStocks.filter(
          (stock) => stock !== StockRemoved,
        ),
      });
    });
    return await this.authService.authenticateUser(user);
  }
  private async getUser(user: UserInterface) {
    const q = query(
      this.collection,
      where('email', '==', user.email),
      limit(1),
    );
    return await getDocs(q);
  }
}
