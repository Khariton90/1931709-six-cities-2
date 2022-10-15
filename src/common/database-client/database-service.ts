import mongoose from 'mongoose';
import { Component } from './../../types/component.types.js';
import { inject, injectable } from 'inversify';
import { IDataBase } from './database.interface.js';
import { ILogger } from '../logger/logger.interface.js';

@injectable()
export default class DatabaseService implements IDataBase {
  constructor(@inject(Component.ILogger) private logger: ILogger) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Try to connect to MongoDB...');
    await mongoose.connect(uri);
    this.logger.info('Database connecting.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database disconnect.');
  }
}
