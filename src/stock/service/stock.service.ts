import { Injectable } from '@nestjs/common';
import { StockMeta } from '../../models/stock.meta';
import { FirebaseService } from '../../firebase/firebase.service';
import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';
import { collection, getDocs, limit, query, Query, where } from '@firebase/firestore';

@Injectable()
export class StockService {
  private readonly collection;
  private pageSize = 10;
  private firstStock: any;
  private lastStock: any;

  constructor(private firebaseService: FirebaseService) {
    this.collection = collection(firebaseService.getFirestore(), 'stocks');
  }

  async getStockByTicker(ticker: string): Promise<StockMeta | null> {
    const q: Query<StockMeta, DocumentData> = query(
      this.collection,
      where('Symbol', '==', ticker.toUpperCase()),
      limit(1),
    );
    const stockByTicker = await getDocs(q);
    let res: StockMeta | null = null;
    stockByTicker.forEach((doc) => {
      res = new StockMeta(doc.id, doc.data());
    });
    return res;
  }

  async getStocksByPage() {
    const stocksRef: QuerySnapshot<FirebaseFirestore.DocumentData> =
      await this.collection.orderBy('Symbol').limit(this.pageSize).get();
    const stocks: StockMeta[] = [];
    let index = 0;
    stocksRef.forEach((doc) => {
      if (index === 0) {
        this.firstStock = doc.data();
      } else if (index === this.pageSize - 1) {
        this.lastStock = doc.data();
      }
      index++;
      stocks.push({ Id: doc.id, ...doc.data() } as StockMeta);
    });
    return stocks;
  }

  async getStocksByNextPage() {
    const stocksRef = await this.collection
      .orderBy('Symbol')
      .limit(this.pageSize)
      .startAfter(this.lastStock)
      .get();
    const stocks: StockMeta[] = [];
    let index = 0;
    stocksRef.forEach((doc) => {
      if (index === 0) {
        this.firstStock = doc;
      } else if (index === this.pageSize - 1) {
        this.lastStock = doc;
      }
      index++;
      stocks.push({ Id: doc.id, ...(doc.data() as StockMeta) } as StockMeta);
    });
    return stocks;
  }

  async getStocksByPrevPage() {
    const stocksRef = await this.collection
      .orderBy('Symbol')
      .limit(this.pageSize)
      .endBefore(this.firstStock)
      .get();
    const stocks: StockMeta[] = [];
    let index = 0;
    stocksRef.forEach((doc) => {
      if (index === 0) {
        this.firstStock = doc.data();
      } else if (index === this.pageSize - 1) {
        this.lastStock = doc.data();
      }
      index++;
      stocks.push({ Id: doc.id, ...(doc.data() as StockMeta) } as StockMeta);
    });
    return stocks;
  }
}
