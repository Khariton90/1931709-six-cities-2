import { DEFAULT_STATIC_IMAGES } from './../app/application.constant.js';
import { ServiceError } from './../types/service-error.enum.js';
import { ValidationErrorField } from './../types/validation-errors-field.type.js';
import crypto from 'crypto';
import { Offer } from './../types/offer.type.js';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import * as jose from 'jose';
import { ValidationError } from 'class-validator';
import { UnknownObject } from '../types/unknown-object.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('~');
  const [
    title,
    description,
    postDate,
    cityName,
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
    cityName,
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

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  error: message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] => errors.map(({property, value, constraints}) => ({
  property,
  value,
  messages: constraints ? Object.values(constraints) : []
}));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void) => {
  Object.keys(someObject).forEach((key) => {
    if (key === property) {
      transformFn(someObject);
    } else if (isObject(someObject[key])) {
      transformProperty(property, someObject[key] as UnknownObject, transformFn);
    }
  });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data: UnknownObject) => {
  properties.forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
    const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
    target[property] = `${rootPath}/${target[property]}`;
  }));
};

