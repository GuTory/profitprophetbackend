import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class AppService {
  private readonly db: Firestore;
  constructor(private firebaseService: FirebaseService) {
    this.db = firebaseService.getFirestore();
  }
  async getAllStocks() {
    const stocksRef = await this.db.collection('stocks').get();
    stocksRef.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    return 'got the stock data';
  }
}
