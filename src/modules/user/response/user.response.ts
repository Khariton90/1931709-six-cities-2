import { Expose } from 'class-transformer';

export default class UserResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public isPro!: string;

  @Expose()
  public avatarUrl!: string;
}
