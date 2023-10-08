import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return 'hello';
  }

  /*
   * Deprecated API because it is needed only once for the initial data load to Firestore.
   * @Post('publish')
   *   async publishAllStocks(): Promise<string> {
   *     return await this.onetime.publishAllStocks();
   * }
   */
}
