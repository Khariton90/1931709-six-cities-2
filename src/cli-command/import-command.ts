import { createOffer, getErrorMessage } from './../utils/common.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { ICliCommand } from './cli-command.interface';

export default class ImportCommand implements ICliCommand {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(error) {
      console.log(`Can't read the file: ${getErrorMessage(error)}`);
    }
  }
}
