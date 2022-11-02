import { Expose } from 'class-transformer';

export default class LoggedUserResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public isPro!: boolean;
}
