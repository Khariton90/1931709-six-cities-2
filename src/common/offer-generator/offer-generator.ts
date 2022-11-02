import { getRandomItems, getRandomItem, generateRandomValue } from './../../utils/random.js';
import { MockData } from '../../types/mock-data.type';
import { OfferGeneratorInterface } from './offer-generator.interface';
import dayjs from 'dayjs';

enum WeekDays {
  First = 1,
  Last = 7
}

enum Rating {
  Min = 1,
  Max = 5
}

enum Bedrooms {
  Min = 1,
  Max = 8
}

enum Adults {
  Min = 1,
  Max = 10
}

enum Price {
  Min = 500,
  Max = 2000
}

enum CountId {
  Min = 1,
  Max = 7
}

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
    const createdDate = dayjs().subtract(generateRandomValue(WeekDays.First, WeekDays.Last), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.city);
    const cityLocation = coords[city].join(';');
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(Rating.Min, Rating.Max).toString();
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(Bedrooms.Min, Bedrooms.Max).toString();
    const maxAdults = generateRandomValue(Adults.Min, Adults.Max).toString();
    const price = generateRandomValue(Price.Min, Price.Max);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const id = generateRandomValue(CountId.Min, CountId.Max);
    const name = getRandomItem(this.mockData.users);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const isPro = getRandomItem<string>(['true', 'false']);
    const comments = generateRandomValue(Adults.Min, Adults.Max).toString();

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
