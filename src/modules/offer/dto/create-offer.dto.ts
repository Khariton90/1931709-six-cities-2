import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';
import { User } from '../../../types/user.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: string;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public amenityes!: string[];
  public author!: User;
  public comments!: number;
  public location!: Location;
  public userId!: number;
}
