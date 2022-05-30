export const getUniqueId = () => {
  const now = new Date();
  let id = Math.floor(now.valueOf() + Math.random()) % 1000;
  return id;
};
