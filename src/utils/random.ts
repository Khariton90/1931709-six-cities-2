export const generateRandomValue = (min: number, max: number, numAfterDigin = 0) => +((Math.random() * (max - min)) + min).toFixed(numAfterDigin);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T => items[generateRandomValue(0, items.length - 1)];
