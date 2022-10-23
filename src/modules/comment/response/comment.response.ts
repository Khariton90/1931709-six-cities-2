import { Expose } from 'class-transformer';

export default class CommentResponse {
  @Expose()
  public commentText!: string;

  @Expose({name: 'createdAt'})
  public postDate!: Date;

  @Expose()
  public rating!: number;

  @Expose()
  public userId!: string;
}
