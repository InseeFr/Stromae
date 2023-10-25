import { LoaderSimple } from 'components/shared/loader';
import { createOidcProvider } from 'oidc-spa/react';
import React from 'react';
import { OIDC, READ_ONLY } from '../../../utils/constants';
import { environment, oidcConf } from '../../../utils/read-env-vars';

const dummyOidcClient = {
  isUserLoggedIn: true,
  logout: () => (window.location.href = '/'),
  getTokens: () => ({
    accessToken: null,
    idToken: null,
    refreshToken: null,
    refreshTokenExpirationTime: null,
    accessTokenExpirationTime: null,
  }),
  renewToken: () => {},
};

const { AUTH_TYPE, IDENTITY_PROVIDER, PORTAIL_URL } = environment;
const { authUrl, realm, client_id } = oidcConf;

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

const isReadOnlyMode = window.location.pathname.startsWith(`/${READ_ONLY}`);

const getExtraQueryParams = () => {
  if (isReadOnlyMode) return { kc_idp_hint: IDENTITY_PROVIDER };
  return {};
};

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  if (AUTH_TYPE === OIDC) {
    const { OidcProvider } = createOidcProvider({
      issuerUri: `${authUrl}/realms/${realm}`,
      clientId: client_id,
      getExtraQueryParams: getExtraQueryParams,
      // See above for other parameters
    });
    return <OidcProvider fallback={<LoaderSimple />}>{children}</OidcProvider>;
  }

  return (
    <AuthContext.Provider value={dummyOidcClient}>
      {children}
    </AuthContext.Provider>
  );
}
