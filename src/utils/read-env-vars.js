/**
 * This function reads environment variables in the order: (If a value is found, it stops.)
 *  - variables defined inside object window._env_ (env variable injected by environnment, docker)
 * @param varName : the variable name
 * @returns the value of variable name
 */
export const getEnvVar = (varName) => {
  // eslint-disable-next-line no-restricted-globals
  return self?._env_[varName] || process.env[varName] || '';
};

export const environment = {
  API_URL: getEnvVar('REACT_APP_SURVEY_API_BASE_URL'),
  AUTH_TYPE: getEnvVar('REACT_APP_AUTH_TYPE') || 'none',
  PORTAIL_URL:
    getEnvVar('REACT_APP_PORTAIL_URL') || `${window.location.origin}`,
  IDENTITY_PROVIDER: getEnvVar('REACT_APP_IDENTITY_PROVIDER'),
};

export const oidcConf = {
  client_id: getEnvVar('REACT_APP_CLIENT_ID'),
  authUrl: getEnvVar('REACY_APP_AUTH_URL'),
  realm: getEnvVar('REACT_APP_AUTH_REALM'),
};
