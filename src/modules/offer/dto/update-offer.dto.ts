import { City } from '../../../types/city.type.js';
import { Location } from '../../../types/location.type.js';
import { User } from '../../../types/user.type.js';
import {IsArray, IsDateString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean} from 'class-validator';
import { CommentLength } from '../../comment/comment.constant.js';

export default class UpdateOfferDto {
  @MinLength(10, {message: 'Minimum character length 10'})
  @MaxLength(100, {message: 'Maximum character length 100'})
  public title?: string;

  @MinLength(CommentLength.Min, {message: `Minimum character length description ${CommentLength.Min}`})
  @MaxLength(CommentLength.Max, {message: `Maximum character length description ${CommentLength.Max}`})
  public description?: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate?: Date;

  public city?: City;

  public cityName?: string;

  public previewImage?: string;

  @IsBoolean({message: 'field isPremium must be a boolean value'})
  public isPremium?: boolean;

  public isFavorite?: boolean;

  @IsInt({message: 'field rating must be integer'})
  @Min(1, {message: 'field rating minimum value should be 1'})
  @Max(5, {message: 'field rating maximum value should be 5'})
  public rating?: number;

  public type?: string;

  @IsInt({message: 'field rooms must be integer'})
  @Min(1, {message: 'field rooms minimum value should be 1'})
  @Max(8, {message: 'field rooms maximum value should be 8'})
  public rooms?: number;

  @IsInt({message: 'field guests must be integer'})
  @Min(1, {message: 'field guests minimum value should be 1'})
  @Max(10, {message: 'field guests maximum value should be 10'})
  public guests?: number;

  @IsInt({message: 'field price must be integer'})
  @Min(100, {message: 'field price minimum value should be 100'})
  @Max(100000, {message: 'field price maximum value should be 100000'})
  public price?: number;

  @IsArray({message: 'field amenityes must be a array'})
  public amenityes?: string[];

  public author?: User;

  public location?: Location;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId?: number;
}
