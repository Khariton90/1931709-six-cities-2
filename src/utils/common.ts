import crypto from 'crypto';
import { Offer } from './../types/offer.type.js';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('~');
  const [
    title,
    description,
    postDate,
    city,
    cityLocation,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    rooms,
    guests,
    price,
    amenityes,
    authorName,
    email,
    password,
    avatar,
    isPro,
    comments,
    offerLocation
  ] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: {
      name: city,
      location: {
        latitude: Number(cityLocation.split(';').slice(0, 1)),
        longitude: Number(cityLocation.split(';').slice(1))
      }
    },
    previewImage,
    images: images.split(';'),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorite),
    rating: Number(rating),
    type,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    amenityes: amenityes.split(';'),
    author: {
      name: authorName,
      email,
      password,
      isPro: isPro,
      avatarUrl: avatar
    },
    comments: Number(comments),
    location: {
      latitude: Number(offerLocation.split(';').slice(0, 1)),
      longitude: Number(offerLocation.split(';').slice(1))
    }
  } as unknown as Offer;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message
});
