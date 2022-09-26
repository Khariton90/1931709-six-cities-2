import { getRandomItems, getRandomItem, generateRandomValue } from './../../utils/random.js';
import { MockData } from '../../types/mock-data.type';
import { OfferGeneratorInterface } from './offer-generator.interface';
import dayjs from 'dayjs';

const FIRTS_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_BEDROOMS_COUNT = 1;
const MAX_BEDROOMS_COUNT = 8;

const MIN_ADULTS_COUNT = 1;
const MAX_ADULTS_COUNT = 10;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_ID = 1;
const MAX_ID = 100;

const coords: {[key: string]: number[]}  = {
  'Paris': [48.85661, 2.351499],
  'Cologne': [50.938361, 6.959974],
  'Brussels': [50.846557, 4.351697],
  'Amsterdam': [52.370216, 4.895168],
  'Hamburg': [53.550341, 10.000654],
  'Dusseldorf': [51.225402, 6.776314]
};

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor (private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRTS_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.city);
    const cityLocation = coords[city].join(';');
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_BEDROOMS_COUNT, MAX_BEDROOMS_COUNT).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS_COUNT, MAX_ADULTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const id = generateRandomValue(MIN_ID, MAX_ID);
    const name = getRandomItem(this.mockData.users);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const isPro = getRandomItem<string>(['true', 'false']);
    const comments = generateRandomValue(MIN_ADULTS_COUNT, MAX_ADULTS_COUNT).toString();

    return [
      title, description, createdDate,
      city, cityLocation, previewImage, images,
      isPremium, isFavorite, rating,
      type, bedrooms, maxAdults,
      price, goods, id, name, avatar, isPro,
      comments, cityLocation
    ].join('\t');
  }
}
