// import { IUserService } from './../user/user-service.interface.js';
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
import { IConfig } from '../../common/config/config.interface.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import UploadImageResponse from './response/upload-image.response.js';
import UpdateFavoriteOfferDto from './dto/update-favorite-offer.dto.js';

type ParamsGetOffer = {
  offerId: string
}

type ParamsGetPemiumCity = {
  city: string
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IOffelService) private readonly offerService: IOfferService,
    // @inject(Component.IUserService) private readonly userService: IUserService,
    @inject(Component.IConfig) configService: IConfig
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/', method:
      HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.findFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateFavoriteOfferDto)
      ]
    });

    this.addRoute(
      {
        path: '/favorites/:offerId',
        method: HttpMethod.Patch,
        handler: this.update,
        middlewares: [
          new PrivateRouteMiddleware(),
          new ValidateObjectIdMiddleware('offerId'),
          new ValidateDtoMiddleware(UpdateFavoriteOfferDto),
          new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
        ]
      });

    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.findPremium
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

    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image')
      ]
    });
  }

  public async findPremium({params}: Request<core.ParamsDictionary | ParamsGetPemiumCity>, res: Response): Promise<void> {
    const { city } = params;
    const offers = await this.offerService.findPremium(city);
    const offersResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offersResponse);
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

  public async uploadImage(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const { offerId } = req.params;
    const updateDto = { previewImage: req.file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }

  public async findFavorites(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorites();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offersResponse);
  }

  public async changeFavorites({params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    if (offer) {
      const updateOffer = await this.offerService.changeFavorites(offerId, offer);
      this.send(res, StatusCodes.CREATED, fillDTO(OfferResponse, updateOffer));
    }
  }
}
