export const numberCorrector = (num: number): string => {
  return num <= 9 ? `0${num}` : `${num}`;
};
