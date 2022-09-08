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
        --help:                        # выводит номер версии
        --import <path>:               # выводит номер версии
        --generator <n> <path> <url>:  # генерирует произвольное количество текстовых данных
  `));
  }
}
