import { getRandomInteger } from '../utils/get-random-integer';

describe('getRandomInteger', () => {
  test('should return random number between 5 and 200', () => {
    const value = getRandomInteger(5, 200);
    expect(value).toBe(+parseInt(value.toString()));
    expect(value).toBeGreaterThanOrEqual(5);
    expect(value).toBeLessThanOrEqual(200);
  });
});
