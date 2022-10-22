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
import CreateCommentDto from './dto/create-comment.dto.js';
import CommentResponse from './response/comment.response.js';
import * as core from 'express-serve-static-core';

type ParamsGetComments = {
  offerId: string
}

@injectable()
export default class CommentController extends Controller{
  constructor(
    @inject(Component.ILogger) readonly logger: ILogger,
    @inject(Component.IOffelService) private readonly offerService: IOfferService,
    @inject(Component.ICommentService) private readonly commentService: ICommentService
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this. getComments, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateObjectIdMiddleware('offerId')]});
  }

  public async getComments({params}: Request<core.ParamsDictionary | ParamsGetComments>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async create({body, params}: Request<core.ParamsDictionary | ParamsGetComments, Record<string, unknown>, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(params.offerId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
