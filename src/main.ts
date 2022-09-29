import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './common/logger/logger.service.js';
import { ILogger } from './common/logger/logger.interface.js';
import { IConfig } from './common/config/config.interface.js';
import Application from './app/application.js';

const appContainer = new Container();

appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();

const app = appContainer.get<Application>(Component.Application);
await app.init();
