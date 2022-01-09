export const capitalizeHelper = (name: string) => {
  return name.replace(/\b\w/g, l => l.toUpperCase());
};
