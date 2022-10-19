import { getEnvVar } from './env';

const basePath = `${window.location.origin}`;

const nameConfigFile =
  getEnvVar('NAME_CONFIG_FILE') ?? 'build-configuration.json';

const nameOidcFile = getEnvVar('NAME_OIDC_FILE') ?? 'keycloak.json';

const getFile = (url) => fetch(url).then((r) => r.json());

export const getConfiguration = () => getFile(`${basePath}/${nameConfigFile}`);

export const getOidc = () => getFile(`${basePath}/${nameOidcFile}`);
