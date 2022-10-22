import { UserEntity } from './../../user/user.entity.js';
import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public amenityes!: string[];

  @Expose()
  public userId!: UserEntity;

  @Expose()
  public comments!: number;

  @Expose()
  public location!: Location;
}
