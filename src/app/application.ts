import { AuthentificateMiddleware } from './../common/middlewares/authentificate.middleware.js';
import { IExceptionFilter } from './../common/errors/exception-filter.interface.js';
import express, {Express} from 'express';
import { IDataBase } from './../common/database-client/database.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from './../types/component.types.js';
import { IConfig } from '../common/config/config.interface.js';
import { ILogger } from '../common/logger/logger.interface.js';
import { getURI } from '../utils/db.js';
import { IController } from '../common/controller/controller.interface.js';
import { getFullServerPath } from '../utils/common.js';
import cors from 'cors';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.ILogger) private logger: ILogger,
    @inject(Component.IConfig) private config: IConfig,
    @inject(Component.IDataBase) private databaseClient: IDataBase,
    @inject(Component.OfferController) private offerController: IController,
    @inject(Component.UserController) private userCotroller: IController,
    @inject(Component.CommentController) private commentController: IController,
    @inject(Component.IExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userCotroller.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );

    this.expressApp.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authentificateMiddleware = new AuthentificateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authentificateMiddleware.execute.bind(authentificateMiddleware));
    this.expressApp.use(cors());
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server has been started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
