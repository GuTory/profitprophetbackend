import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth/auth.service';
import { UserInterface } from '../model/user.interface';
import { FirebaseService } from '../../common/service/firebase/firebase.service';

describe('AuthController', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [AuthService, FirebaseService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('authenticate user', async () => {
    expect(controller).toBeDefined();
    const user = await controller.authenticateUser(dummyUser);
    expect(user).toBeDefined();
    expect(user).toHaveProperty('email');
    expect(user.email).toEqual(dummyUser.email);
  });
  it('logout user', async () => {
    expect(controller).toBeDefined();
    const loggedInUser = await controller.authenticateUser(dummyUser);
    expect(loggedInUser).toBeDefined();
    const user = await controller.logout(dummyUser);
    expect(user).toBeDefined();
    expect(user).toHaveProperty('email');
    expect(user).toEqual(dummyUser);
    expect(user.email).toEqual(dummyUser.email);
  });
});
