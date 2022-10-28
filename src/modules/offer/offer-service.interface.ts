import { OfferEntity } from './offer.entity.js';
import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { IDocumentExists } from '../../types/document-exists.interface.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findNew(count: number): Promise<DocumentType<OfferEntity>[]>;
}

