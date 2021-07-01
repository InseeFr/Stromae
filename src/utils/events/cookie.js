export const getSessionCookie = () => {
  const result = document.cookie;
  console.log('cookie', result);
  return result;
};
