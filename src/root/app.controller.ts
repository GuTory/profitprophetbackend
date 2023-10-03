import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OneTimeService } from '../one-time/one-time.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private onetime: OneTimeService,
  ) {}

  @Get('')
  async getHello(): Promise<string> {
    return await this.appService.getAllStocks();
  }

  @Get('publish')
  async publishAllStocks(): Promise<string> {
    return await this.onetime.publishAllStocks();
  }
}
