import { Offer } from './../types/offer.type';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
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
    id,
    authorName,
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
      id: Number(id),
      name: authorName,
      isPro: JSON.parse(isPro),
      avatarUrl: avatar
    },
    comments: Number(comments),
    location: {
      latitude: Number(offerLocation.split(';').slice(0, 1)),
      longitude: Number(offerLocation.split(';').slice(1))
    }
  } as Offer;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
