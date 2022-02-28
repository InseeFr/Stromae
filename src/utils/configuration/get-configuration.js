import { getEnvVar } from './env';

const basePath = `${window.location.origin}`;

const nameConfigFile =
  getEnvVar('NAME_CONFIG_FILE') ?? 'build-configuration.json';

const nameOidcFile = getEnvVar('NAME_OIDC_FILE') ?? 'oidc.json';

const getFile = url => fetch(url).then(r => r.json());

export const getConfiguration = setConfiguration =>
  getFile(`${basePath}/${nameConfigFile}`).then(r => setConfiguration(r));

export const getOidcFile = () => getFile(`${basePath}/${nameOidcFile}`);
