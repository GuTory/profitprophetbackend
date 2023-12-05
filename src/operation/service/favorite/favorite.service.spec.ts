import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { FirebaseService } from '../../../common/service/firebase/firebase.service';
import { AuthService } from '../../../auth/service/auth/auth.service';
import { UserInterface } from '../../../auth/model/user.interface';

describe('FavoriteService', () => {
  let favoriteService: FavoriteService;

  const dummyUser: UserInterface = {
    provider: 'roti 34 Ltd.',
    id: '69420',
    email: 'posedge@clk.hu',
    name: 'Cseotschey',
    photoUrl: 'D:/kepek/photo.jpeg',
    firstName: 'Kriss',
    lastName: 'Toth',
    authToken: 'cup revolution',
    idToken: 'id cup revolution',
    authorizationCode: 'engedj be',
    response: 'OK',
    subscription: 'Basic',
    favoriteStocks: ['AA', 'MSFT'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService, FirebaseService, AuthService],
    }).compile();

    favoriteService = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(favoriteService).toBeDefined();
  });
  it('dummy user should have 2 favorites, when adding one 3', async () => {
    expect(dummyUser.favoriteStocks.length).toEqual(2);
    const updatedUser = await favoriteService.addFavorite(dummyUser, 'AA');
    expect(updatedUser.favoriteStocks.length).toEqual(3);
    const updatedUser2 = await favoriteService.removeFavorite(
      updatedUser,
      'AA',
    );
    expect(updatedUser2.favoriteStocks.length).toEqual(2);
  });
});
