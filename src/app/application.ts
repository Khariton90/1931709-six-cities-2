import { inject, injectable } from 'inversify';
import { Component } from './../types/component.types.js';
import { IConfig } from '../common/config/config.interface.js';
import { ILogger } from '../common/logger/logger.interface.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig) {}

  public async init() {
    this.logger.info('App initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
