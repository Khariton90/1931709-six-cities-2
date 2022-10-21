import { Expose } from 'class-transformer';

export default class UserResponse {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public password!: string;

  @Expose()
  public isPro!: string;

  @Expose()
  public avatarUrl!: string;
}
