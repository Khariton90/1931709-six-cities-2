import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../common/logger/logger.interface.js';
import CreateOfferDto from '../dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILogger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
