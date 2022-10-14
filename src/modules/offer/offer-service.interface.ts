import { OfferEntity } from './offer.entity';
import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from '../dto/create-offer.dto';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

