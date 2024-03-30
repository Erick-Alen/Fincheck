export const currencyStringToNumber = (value: string | number) => {
  if (typeof value === 'number') return value;
  return Number(value.replace(/\./g, '').replace(',', '.'));
  // applying  aregex to remove all the dots of the string and replace the comma with a dot
}
