import { UserEntity } from './../user/user.entity.js';
import { OfferEntity } from './../offer/offer.entity.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public commentText!: string;

  @prop({min: 0, max: 5, required: true, default: 0})
  public rating!: number;

  @prop({ref: OfferEntity, required: true})
  public offerId!: Ref<OfferEntity>;

  @prop({ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
