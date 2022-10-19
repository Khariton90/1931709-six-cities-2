import { IDataBase } from './../common/database-client/database.interface';
import { inject, injectable } from 'inversify';
import { Component } from './../types/component.types.js';
import { IConfig } from '../common/config/config.interface.js';
import { ILogger } from '../common/logger/logger.interface.js';
import { getURI } from '../utils/db.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDataBase) private databaseClient: IDataBase
  ) {}

  public async init() {
    this.logger.info('App initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);
  }
}
