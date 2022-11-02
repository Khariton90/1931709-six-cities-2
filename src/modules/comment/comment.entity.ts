import { UserEntity } from './../user/user.entity.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { MIN_LENGTH_TEXT, MAX_LENGTH_TEXT, MIN_RATING, MAX_RATING } from './comment.constant.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, min: MIN_LENGTH_TEXT, max: MAX_LENGTH_TEXT})
  public commentText!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({min: MIN_RATING, max: MAX_RATING, required: true, default: MIN_RATING})
  public rating!: number;

  @prop({ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
