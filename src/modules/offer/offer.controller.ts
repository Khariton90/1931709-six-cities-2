import { StatusCodes } from 'http-status-codes';
import { IOfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { ILogger } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from './../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import DeleteOfferDto from './dto/delete-offer.dto.js';
import HttpError from '../../common/errors/http-error.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILogger) logger: ILogger,
    @inject(Component.IOffelService) private readonly offerService: IOfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/create', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:id/delete', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:id/update', method: HttpMethod.Patch, handler: this.update});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offersResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const newOffer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferResponse, newOffer));
  }

  public async delete({body}: Request<Record<string, unknown>, Record<string, unknown>, DeleteOfferDto>, _res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(body.id);

    if (!existsOffer) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, `User id ${body.id} unauthorized`, 'OfferController');
    }

    await this.offerService.deleteById(body.id);
    this.logger.info(`the user id ${body.id} has been removed `);
    throw new HttpError(StatusCodes.NO_CONTENT, 'User removed', 'OfferController');
  }

  public async update({body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(body._id);

    if (!existsOffer) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'User unauthorized', 'OfferController');
    }

    const result = await this.offerService.updateById(body._id, body);
    this.send(res, StatusCodes.CREATED, fillDTO(OfferResponse, result));
  }

}
