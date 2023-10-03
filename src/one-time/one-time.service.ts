import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class OneTimeService {
  private readonly db: Firestore;

  constructor(private firebaseService: FirebaseService) {
    this.db = firebaseService.getFirestore();
  }

  async publishAllStocks() {
    await this.db.collection('stocks').add({
      name: 'TSLA',
      price: 1000,
      description: 'Tesla',
    });
    return 'published all stocks';
  }
}
