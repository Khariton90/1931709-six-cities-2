import { configSchema, ConfigSchema } from './config.schema.js';
import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { ILogger } from '../logger/logger.interface.js';
import { IConfig } from './config.interface';
import { Component } from '../../types/component.types.js';

@injectable()
export default class ConfigService implements IConfig {
  private config: ConfigSchema;
  private logger: ILogger;

  constructor(@inject(Component.ILogger) logger: ILogger) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Cant\'t read .env file. Perhaps the file does not exists');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and succesfully parsed');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
