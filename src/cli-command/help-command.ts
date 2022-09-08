import { ICliCommand } from './cli-command.interface';
import chalk from 'chalk';

export class HelpCommand implements ICliCommand {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.green(`
    Программа для подготовки данных REST API сервера.

    Пример:
      main.js --<command> [--arguments]

      Команды:
        --version:                     # выводит номер версии
        --help:                        # выводит помощь
        --import <path>:               # выводит импорт из TSV
        --generator <n> <path> <url>:  # генерирует произвольное количество текстовых данных
  `));
  }
}
