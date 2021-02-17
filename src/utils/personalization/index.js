export const buildBuidings = variables =>
  variables.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});
