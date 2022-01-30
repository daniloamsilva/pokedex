export const removeDuplicates = (array: Array<string>) => {
  return array.filter(
    (resistance, index) => array.indexOf(resistance) === index,
  );
};
