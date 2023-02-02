const OVERLOAD = { fs: false, stream: false, os: false };

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      const { resolve } = config;
      const { fallback } = resolve;

      return {
        ...config,
        resolve: {
          ...resolve,
          fallback: { ...fallback, ...OVERLOAD },
        },
      };
    },
  },
};
