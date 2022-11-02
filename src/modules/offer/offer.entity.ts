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
  @prop({trim: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public cityName!: string;

  @prop()
  public city!: City;

  @prop({default: ''})
  public previewImage!: string;

  @prop({ default: []})
  public images!: string[];

  @prop({default: false})
  public isPremium!: boolean;

  @prop({default: false})
  public isFavorite!: boolean;

  @prop({default: 0})
  public rating!: number;

  @prop({trim: true})
  public type!: string;

  @prop({default: 0})
  public rooms!: number;

  @prop({default: 0})
  public guests!: number;

  @prop()
  public price!: number;

  @prop({default: []})
  public amenityes!: string[];

  @prop({default: 0})
  public comments!: number;

  @prop()
  public location!: Location;

  @prop({
    ref: UserEntity,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
