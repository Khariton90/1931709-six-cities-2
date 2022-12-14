import { readFileSync } from 'fs';
import { ICliCommand } from './cli-command.interface.js';
import chalk from 'chalk';

export default class VersionCommand implements ICliCommand {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute() {
    const version = this.readVersion();
    console.log(chalk.yellow(version));
  }
}
