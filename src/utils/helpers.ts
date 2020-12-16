import { DIVISIBLE } from './consts'

export const getTotalNumber = (start: number, end: number) => {
  let totalNumber = 0;
  for (let index = start; index <= end; index++) {
    if (index % DIVISIBLE === 0) {
      totalNumber++;
    }
  }
  return totalNumber;
};
