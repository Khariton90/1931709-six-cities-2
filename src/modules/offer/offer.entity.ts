import { UserEntity } from './../user/user.entity.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';
import { Location } from '../../types/location.type.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true, default: []})
  public images!: string[];

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true, default: false})
  public isFavorite!: boolean;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({trim: true, required: true})
  public type!: string;

  @prop({required: true, default: 0})
  public rooms!: number;

  @prop({required: true, default: 0})
  public guests!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true, default: []})
  public amenityes!: string[];

  @prop({ref: UserEntity, required: true})
  public author!: Ref<UserEntity>;

  @prop({default: 0})
  public comments!: number;

  @prop({required: true})
  public location!: Location;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
