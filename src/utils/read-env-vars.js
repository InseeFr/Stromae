/**
 * This function reads environment variables in the order: (If a value is found, it stops.)
 *  - variables defined inside object window._env_ (env variable injected by environment, docker)
 * @param varName : the variable name
 * @returns the value of variable name
 */
export const getEnvVar = (varName) => {
  // eslint-disable-next-line no-restricted-globals
  return window?._env_?.[varName] || process.env[varName] || '';
};

export const environment = {
  API_URL: getEnvVar('REACT_APP_SURVEY_API_BASE_URL'),
  AUTH_TYPE: getEnvVar('REACT_APP_AUTH_TYPE') || 'none',
  PORTAIL_URL:
    getEnvVar('REACT_APP_PORTAIL_URL') || `${window.location.origin}`,
  IDENTITY_PROVIDER: getEnvVar('REACT_APP_IDENTITY_PROVIDER'),
  // VISUALIZE is disabled by default, so if value is not present and not set to true in env-config.js, VISUALIZE page is disabled
  VIZUALIZE_ENABLED: getEnvVar('REACT_APP_VIZUALIZE_ENABLED') || false,
};

export const oidcConf = {
  client_id: getEnvVar('REACT_APP_CLIENT_ID'),
  authUrl: getEnvVar('REACT_APP_AUTH_URL'),
  realm: getEnvVar('REACT_APP_AUTH_REALM'),
  // If no value is provided, default value is 15 minutes = 900 seconds (15 * 60)
  noActivityTimeoutInSeconds:
    Number(getEnvVar('REACT_APP_NO_ACTIVITY_TIMEOUT')) || 900,
};
