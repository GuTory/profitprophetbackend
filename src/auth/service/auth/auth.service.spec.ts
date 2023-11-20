import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { FirebaseService } from '../../../common/service/firebase/firebase.service';
import { UserInterface } from '../../model/user.interface';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService, FirebaseService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should authenticate dummy user', async () => {
    expect(service.getCurrentUser()).toBeNull();
    expect(service.IsAuthenticated()).toBeFalsy();
    const user = await service.authenticateUser(dummyUser);
    expect(user).toBeDefined();
    expect(user?.email).toEqual(dummyUser.email);
    const authenticatedUser = service.getCurrentUser();
    expect(authenticatedUser).toBeDefined();
  });
  it('should logout user', async () => {
    expect(service.getCurrentUser()).toBeNull();
    expect(service.IsAuthenticated()).toBeFalsy();
    const user = await service.authenticateUser(dummyUser);
    expect(user).toBeDefined();
    expect(user?.email).toEqual(dummyUser.email);
    const authenticatedUser = service.getCurrentUser();
    expect(authenticatedUser).toBeDefined();
    const loggedoutUser = await service.logout(service.getCurrentUser());
    expect(loggedoutUser).toBeDefined();
    expect(loggedoutUser?.email).toEqual(dummyUser.email);
    expect(service.getCurrentUser()).toBeNull();
    expect(service.IsAuthenticated()).toBeFalsy();
  });
});
