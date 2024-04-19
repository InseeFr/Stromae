import { createMockReactOidc } from 'oidc-spa/mock/react';
import { createReactOidc } from 'oidc-spa/react';
import { READ_ONLY } from 'utils/constants';
import { environment, oidcConf } from '../read-env-vars';

const { AUTH_TYPE, IDENTITY_PROVIDER, PORTAIL_URL } = environment;

const { authUrl, client_id, realm } = oidcConf;

const isReadOnlyMode = window.location.pathname.startsWith(`/${READ_ONLY}`);

function getCurrentSurvey(path) {
  const temp = path.split('/questionnaire/');
  if (temp.length > 1) {
    const idQ = temp[1].slice(0, temp[1].indexOf('/'));
    return idQ.substr(0, idQ.indexOf('2')).toLowerCase();
  }
  return '';
}

export const getLogoutUrl = () =>
  `${PORTAIL_URL}/${getCurrentSurvey(window.location.href)}`;

const getExtraQueryParams = () => {
  if (isReadOnlyMode) return { kc_idp_hint: IDENTITY_PROVIDER };
  return {};
};

export const { OidcProvider, useOidc, prOidc } =
  AUTH_TYPE === 'none'
    ? createMockReactOidc({ isUserInitiallyLoggedIn: true })
    : createReactOidc({
        clientId: client_id,
        issuerUri: `${authUrl}/realms/${realm}`,
        publicUrl: process.env.PUBLIC_URL,

        extraQueryParams: getExtraQueryParams,
      });
