import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { FirebaseService } from '../../common/service/firebase/firebase.service';
import { AuthService } from '../../auth/service/auth/auth.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteService, FirebaseService, AuthService],
    }).compile();

    service = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
