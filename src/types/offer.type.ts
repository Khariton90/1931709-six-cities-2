import { City } from './city.type';
import { Location } from './location.type.js';

export type User = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string
}

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
  author: User,
  comments: number,
  location: Location,
}
