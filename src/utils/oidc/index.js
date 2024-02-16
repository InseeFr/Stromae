import { createReactOidc } from 'oidc-spa/react';
import { OIDC, READ_ONLY } from 'utils/constants';
import { listenActivity } from 'utils/events';
import { environment, oidcConf } from 'utils/read-env-vars';

const { IDENTITY_PROVIDER, PORTAIL_URL, AUTH_TYPE } = environment;
const { authUrl, realm, client_id } = oidcConf;

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

const dummyOidc = {
  isUserLoggedIn: true,
  logout: () => (window.location.href = '/'),
  oidcTokens: {
    accessToken: null,
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    accessTokenExpirationTime: Date.now() + 60 * 60 * 1000,
  },
  login: () => window.location.reload(),
  getTokens: () => ({
    accessToken: null,
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    accessTokenExpirationTime: Date.now() + 60 * 60 * 1000,
  }),
};

const NoneProvider = ({ children }) => <>{children}</>;

const createReactNone = () => {
  return {
    OidcProvider: NoneProvider,
    prOidc: Promise.resolve(dummyOidc),
    useOidc: () => dummyOidc,
  };
};

const createReactNoneorOidc = () => {
  if (AUTH_TYPE === OIDC)
    return createReactOidc({
      clientId: client_id,
      issuerUri: `${authUrl}/realms/${realm}`,

      extraQueryParams: getExtraQueryParams,
    });

  return createReactNone();
};

export const { OidcProvider, prOidc, useOidc } = createReactNoneorOidc();

prOidc.then((oidc) => {
  if (!oidc.isUserLoggedIn) {
    return;
  }
  let timer;

  const getDelayExpriationinMs = () => {
    const expirationTime = oidc.getTokens().accessTokenExpirationTime;
    return expirationTime - Date.now();
  };

  const logoutIfIdle = async () => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      await oidc.logout({ redirectTo: 'current page' });
    }, getDelayExpriationinMs());
  };

  // Initial call to set the logout timer
  logoutIfIdle();

  // Event listeners to reset timer on user activity
  listenActivity(logoutIfIdle);
});
