import { Body, Controller, Post } from '@nestjs/common';
import { BalanceService } from '../../service/balance/balance.service';

@Controller('operation')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}
  @Post('/balance')
  public async uploadMoney(@Body() value: { amount: number }) {
    return await this.balanceService.uploadMoney(value.amount);
  }
}
