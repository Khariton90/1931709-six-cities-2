import { createErrorObject } from './../../utils/common.js';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { IExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../types/component.types.js';
import { ILogger } from '../logger/logger.interface.js';
import HttpError from './http-error.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILogger) private logger: ILogger
  ) {
    this.logger.info('Register exceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} - ${error.message}`);

    res.status(error.httpStatusCode).json(createErrorObject(error.message));
    next();
  }

  private handleOtherError(error: Error, _req: Request, res: Response, next: NextFunction) {
    this.logger.error(error.message);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(error.message));
    next();
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
