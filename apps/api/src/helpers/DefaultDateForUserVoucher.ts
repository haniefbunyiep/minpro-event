export const defaultExpireAt = () => {
  let result;
  result = new Date(Date.now());
  result.setMonth(result.getMonth() + 3);
  return result.toISOString();
};
