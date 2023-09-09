import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class StockDataReaderService {
  pythonMessage: string;

  async getStockData(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const pythonFunction = spawn(
        'python',
        ['./src/stock-metadata-reader.py'],
        {
          stdio: 'pipe',
        },
      );
      pythonFunction.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        this.pythonMessage = data.toString();
        resolve(this.pythonMessage);
      });
      pythonFunction.stderr.on('data', (data: string) => {
        reject(data);
        console.error(`stderr: ${data}`);
      });
      pythonFunction.on('close', (code) => {
        this.pythonMessage = code.toString();
        console.log(`child process exited with code ${code}`);
      });
    });
    /*
    const pythonFunction = spawn('python', ['./src/stock-metadata-reader.py']);
    pythonFunction.stdout.on('data', (data) => {
      this.pythonMessage = data.toString();
      console.log(`stdout: ${data}`);
    });
    pythonFunction.stderr.on('data', (data) => {
      this.pythonMessage = data.toString();
      console.error(`stderr: ${data}`);
    });
    pythonFunction.on('close', (code) => {
      this.pythonMessage = code.toString();
      console.log(`child process exited with code ${code}`);
    });
    re
    turn this.pythonMessage;
     */
  }
}
