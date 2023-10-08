import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class OneTimeService {
  private readonly db: Firestore;

  constructor(private firebaseService: FirebaseService) {
    //this.db = firebaseService.getFirestore();
  }

  // for only one time publishing of stocks to google firestore
  async publishAllStocks() {
    /*
    const symbols_valid_meta: any[] = await import(
      '../../assets/symbols_valid_meta.json'
    );
    for (const stock of symbols_valid_meta) {
      await this.db.collection('stocks').add(stock);
      console.log(`published ${stock['Symbol']}`);
    }

    return 'published all stocks';

     */
  }
}
