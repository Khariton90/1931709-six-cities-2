import { DEFAULT_IMAGES_LIST, DEFAULT_LIMIT_PREMIUM_OFFERS, DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from './../../types/sort-type.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from './../../types/component.types.js';
import { injectable, inject } from 'inversify';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../common/logger/logger.interface.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { getRandomItem } from '../../utils/random.js';

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILogger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const randomPreviewImage = getRandomItem(DEFAULT_IMAGES_LIST);
    const result = await this.offerModel.create(
      {
        ...dto,
        previewImage: randomPreviewImage,
        images: Array.from({length: 6}, () => getRandomItem(DEFAULT_IMAGES_LIST))
      });
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async find(count: number): Promise<DocumentType<OfferEntity>[]> {
    const countLimit = count ? count : DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find().sort({createdAt: SortType.Down}).limit(countLimit).populate(['userId']).exec();
  }

  public async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    const cityName = city[0].toUpperCase() + city.slice(1);

    return this.offerModel
      .find({cityName: cityName, isPremium: 'true'})
      .limit(DEFAULT_LIMIT_PREMIUM_OFFERS)
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true}).populate(['userId']).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {comments: 1}}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({}, {}, {limit: DEFAULT_OFFER_COUNT})
      .sort({createdAt: SortType.Down})
      .limit(count)
      .populate(['userId'])
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isFavorite: 'true'})
      .sort({createdAt: SortType.Down})
      .populate('userId')
      .exec();
  }

  public async changeFavorites(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true}).populate(['userId']).exec();
  }
}
