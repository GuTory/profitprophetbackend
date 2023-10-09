import { Injectable } from '@nestjs/common';
import { StockMeta } from '../../models/stock.meta';
import { FirebaseService } from '../../firebase/firebase.service';
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
} from '@firebase/firestore';

type StockQuery = Query<StockMeta, DocumentData>;

@Injectable()
export class StockService {
  private readonly collection;
  private pageSize = 3;
  private firstStock: any;
  private lastStock: any;

  constructor(private firebaseService: FirebaseService) {
    this.collection = collection(firebaseService.getFirestore(), 'stocks');
  }

  async getStockByTicker(ticker: string): Promise<StockMeta | null> {
    const q: StockQuery = query(
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
      limit(this.pageSize),
      endBefore(this.firstStock),
    );
    return await this.executeQueryAndConvertToModel(q);
  }

  private async executeQueryAndConvertToModel(q: StockQuery) {
    const stockDocs = await getDocs(q);
    const stocks: StockMeta[] = [];
    let index = 0;
    stockDocs.forEach((doc) => {
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
