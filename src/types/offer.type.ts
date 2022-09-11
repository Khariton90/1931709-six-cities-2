import { City } from './city.type';
import { Location } from './location.type.js';

export type Offer = {
  title: string,
  description: string,
  postDate: Date,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: string,
  rooms: number,
  guests: number,
  price: number,
  amenityes: string[],
  author: string,
  comments: number,
  location: Location,
}
