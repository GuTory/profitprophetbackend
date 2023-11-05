import { Controller, Get, Param } from '@nestjs/common';
import { PredictionService } from '../service/prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get(':ticker')
  getPrediction(@Param('ticker') ticker: string) {
    return this.predictionService.executePythonScript(ticker);
  }
}
