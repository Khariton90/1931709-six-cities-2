import { UserEntity } from './../user/user.entity.js';
import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { Rating, CommentLength } from './comment.constant.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: CommentLength.Min, maxlength: CommentLength.Max})
  public commentText!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({min: Rating.Min, max: Rating.Max, required: true, default: Rating.Min})
  public rating!: number;

  @prop({ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
