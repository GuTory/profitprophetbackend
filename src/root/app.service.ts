import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /*
   * Should not let the client get all the stock data at once. Use pagination instead.
   *
  private async getAllStocks() {
    const stocksRef = await this.db.collection('stocks').get();
    stocksRef.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    return 'got the stock data';
  }
   */
}
