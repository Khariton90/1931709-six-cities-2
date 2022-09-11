import { Offer } from './../../types/offer.type';
import { readFileSync } from 'fs';
import { IFileReader } from './file-reader.interface';

export default class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('~'))
      .map((
        [
          title,
          description,
          postDate,
          city,
          lat,
          lng,
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
          author,
          comments,
          latitude,
          longitude
        ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: {
          name: city,
          location: {
            latitude: Number(lat),
            longitude: Number(lng)
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
        author,
        comments: Number(comments),
        location: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        }
      }));
  }
}

