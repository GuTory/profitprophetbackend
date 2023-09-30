import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { collection, Firestore, getDocs } from 'firebase/firestore';

@Injectable()
export class AppService {
  private readonly db: Firestore;
  constructor(private firebaseService: FirebaseService) {
    this.db = firebaseService.getFirestore();
  }
  async getAllStocks() {
    const stocksRef = collection(this.db, 'stocks');
    const stocksSnapshot = await getDocs(stocksRef);
    console.log(stocksSnapshot.docs.map((doc) => doc.data()));
    return 'got the stock data';
  }
}
