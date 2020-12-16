import { getTotalNumber } from '../helpers';

describe('Utils helpers', () => {
  it('return counted number of integers divisible by 3', () => {
    expect(getTotalNumber(1, 3)).toBe(1);
    expect(getTotalNumber(1, 6)).toBe(2);
    expect(getTotalNumber(1, 9)).toBe(3);
  });
});
