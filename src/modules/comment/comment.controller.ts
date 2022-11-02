import { PrivateRouteMiddleware } from './../../common/middlewares/private-route.middleware.js';
import { StatusCodes } from 'http-status-codes';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from './../../common/middlewares/validate-objectid.middleware.js';
import { fillDTO } from './../../utils/common.js';
import { ICommentService } from './comment-service.interface.js';
import { IOfferService } from './../offer/offer-service.interface.js';
import { Response, Request } from 'express';
import { HttpMethod } from './../../types/http-method.enum.js';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { ILogger } from '../../common/logger/logger.interface.js';
import CommentResponse from './response/comment.response.js';
import * as core from 'express-serve-static-core';
import HttpError from '../../common/errors/http-error.js';
import { IConfig } from '../../common/config/config.interface.js';

type ParamsGetComments = {
  offerId: string
}

@injectable()
export default class CommentController extends Controller{
  constructor(
    @inject(Component.ILogger) readonly logger: ILogger,
    @inject(Component.IOffelService) private readonly offerService: IOfferService,
    @inject(Component.ICommentService) private readonly commentService: ICommentService,
    @inject(Component.IConfig) configService: IConfig
  ) {
    super(logger, configService);
    this.logger.info('Register routes for CommentController');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this. getComments, middlewares: [
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
    ]
    });
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create, middlewares: [
      new PrivateRouteMiddleware(),
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
    ]
    });
  }

  public async getComments({params}: Request<core.ParamsDictionary | ParamsGetComments>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async create(req: Request<core.ParamsDictionary | ParamsGetComments>, res: Response): Promise<void> {
    const { offerId } = req.params;

    if (!await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'CommentController'
      );
    }
    const comment = await this.commentService.create({...req.body, userId: req.user.id});
    await this.offerService.incCommentCount(req.body.offerId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
