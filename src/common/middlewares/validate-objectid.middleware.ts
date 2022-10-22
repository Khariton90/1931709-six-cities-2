import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';

const { Types } = mongoose;

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(StatusCodes.NOT_FOUND, `${objectId} is invalid ObjectId`, 'ValidateObjectIdMiddleware');
  }
}
