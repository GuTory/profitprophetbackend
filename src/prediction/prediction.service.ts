import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as util from 'util';

@Injectable()
export class PredictionService {
  private pythonScriptPath = 'python/child.py';

  public async executePythonScript(ticker: string): Promise<number> {
    const ex = util.promisify(exec);
    let prediction = -1;
    const childResult: { stdout: string; stderr: string } = await ex(
      `C:\\Users\\Dell\\AppData\\Local\\Programs\\Python\\Python311\\python.exe ${this.pythonScriptPath} ${ticker}`,
    );
    prediction = parseFloat(childResult.stdout);
    return prediction;
  }
}
