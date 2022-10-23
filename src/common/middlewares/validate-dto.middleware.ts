import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { IMiddleware } from './../../types/middleware.interface.js';
import { validate } from 'class-validator';

export class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
