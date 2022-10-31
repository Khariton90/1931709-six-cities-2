import { PrivateRouteMiddleware } from './../../common/middlewares/private-route.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateDtoMiddleware } from './../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from './../../common/middlewares/validate-objectid.middleware.js';
import { StatusCodes } from 'http-status-codes';
import { IOfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { ILogger } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from './../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

type ParamsGetOffer = {
  offerId: string
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IOffelService) private readonly offerService: IOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/', method:
      HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)]
      ,
    });

    this.addRoute({
      path: '/:offerId/delete',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute(
      {
        path: '/:offerId/update',
        method: HttpMethod.Patch,
        handler: this.update,
        middlewares: [
          new PrivateRouteMiddleware(),
          new ValidateObjectIdMiddleware('offerId'),
          new ValidateDtoMiddleware(UpdateOfferDto),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
        ]
      });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();

    const offersResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offersResponse);
  }

  public async show({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const { body, user } = req;
    const result = await this.offerService.create({...body, userId: user.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async delete({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    await this.offerService.deleteById(params.offerId);
    this.noContent(res, StatusCodes.NO_CONTENT);
  }

  public async update({body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    const {offerId} = params;
    const updateOffer = await this.offerService.updateById(offerId, body);
    this.send(res, StatusCodes.CREATED, fillDTO(OfferResponse, updateOffer));
  }
}
