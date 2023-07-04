export const getEnvVar = (key) => window?._env_?.[key] || process.env[key];
