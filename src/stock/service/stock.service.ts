import { Injectable } from '@nestjs/common';
import { Stock } from '../model/stock';
import { FirebaseService } from '../../common/service/firebase/firebase.service';
import { DocumentData } from 'firebase-admin/firestore';
import {
  collection,
  endBefore,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  where,
  limitToLast,
} from '@firebase/firestore';

type StockQuery = Query<Stock, DocumentData>;

@Injectable()
export class StockService {
  private readonly collection;
  private pageSize = 5;
  private firstStock: any;
  private lastStock: any;

  constructor(private firebaseService: FirebaseService) {
    this.collection = collection(firebaseService.getFirestore(), 'stocks');
  }

  async getStockByTicker(ticker: string): Promise<Stock | []> {
    if (ticker === '') return [];
    const q: StockQuery = query(
      this.collection,
      where('Symbol', '==', ticker.toUpperCase()),
      limit(1),
    );
    const stockByTicker = await getDocs(q);
    let res: Stock | null = null;
    stockByTicker.forEach((doc) => {
      res = new Stock(doc.id, doc.data());
    });
    return res;
  }

  async getStocksByPage() {
    const q: StockQuery = query(
      this.collection,
      orderBy('Symbol'),
      limit(this.pageSize),
    );
    return await this.executeQueryAndConvertToModel(q);
  }

  async getStocksByNextPage() {
    const q: StockQuery = query(
      this.collection,
      orderBy('Symbol'),
      limit(this.pageSize),
      startAfter(this.lastStock),
    );
    return await this.executeQueryAndConvertToModel(q);
  }

  async getStocksByPrevPage() {
    const q: StockQuery = query(
      this.collection,
      orderBy('Symbol'),
      limitToLast(this.pageSize),
      endBefore(this.firstStock),
    );
    return await this.executeQueryAndConvertToModel(q);
  }

  private async executeQueryAndConvertToModel(q: StockQuery) {
    const stockDocs = await getDocs(q);
    const stocks: Stock[] = [];
    let index = 0;
    stockDocs.forEach((doc) => {
      if (index === 0) {
        this.firstStock = doc;
      } else if (index === this.pageSize - 1) {
        this.lastStock = doc;
      }
      index++;
      stocks.push({ Id: doc.id, ...(doc.data() as Stock) } as Stock);
    });
    return stocks;
  }
}
