import { IExceptionFilter } from './common/errors/exception-filter.interface.js';
import 'reflect-metadata';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import { IOfferService } from './modules/offer/offer-service.interface';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { IDataBase } from './common/database-client/database.interface.js';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import { ILogger } from './common/logger/logger.interface.js';
import { IConfig } from './common/config/config.interface.js';
import Application from './app/application.js';
import DatabaseService from './common/database-client/database-service.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './common/logger/logger.service.js';
import { IUserService } from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import OfferService from './modules/offer/offer.service.js';
import { ICommentService } from './modules/comment/comment-service.interface.js';
import CommentService from './modules/comment/comment.service.js';
import { IController } from './common/controller/controller.interface.js';
import OfferController from './modules/offer/offer.controller.js';
import UserController from './modules/user/user.controller.js';
import ExceptionFilter from './common/errors/exception-filter.js';

const appContainer = new Container();

appContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
appContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
appContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
appContainer.bind<IDataBase>(Component.IDataBase).to(DatabaseService).inSingletonScope();
appContainer.bind<IUserService>(Component.IUserService).to(UserService);
appContainer.bind<IOfferService>(Component.IOffelService).to(OfferService);
appContainer.bind<ICommentService>(Component.ICommentService).to(CommentService);
appContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
appContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
appContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

appContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
appContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();
appContainer.bind<IExceptionFilter>(Component.IExceptionFilter).to(ExceptionFilter).inSingletonScope();

const app = appContainer.get<Application>(Component.Application);
await app.init();
