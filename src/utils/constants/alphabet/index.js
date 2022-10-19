const getAlphabet = () => {
  const alphabets = [];
  const start = 'A'.charCodeAt(0);
  const last = 'Z'.charCodeAt(0);
  for (let i = start; i <= last; ++i) {
    alphabets.push(String.fromCharCode(i));
  }
  return alphabets;
};

export default getAlphabet();
