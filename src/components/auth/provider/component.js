import React, { useEffect, useState } from 'react';
import { errorDictionary } from '../../../i18n';
import { createOidcClient } from '../../../utils/auth';
import { NONE, OIDC } from '../../../utils/constants';
import { listenActivity } from '../../../utils/events';
import { environment, oidcConf } from '../../../utils/read-env-vars';
import { LoaderSimple } from '../../shared/loader';

const dummyOidcClient = {
  isUserLoggedIn: true,
  accessToken: null,
  logout: () => (window.location.href = '/'),
};

const { AUTH_TYPE, IDENTITY_PROVIDER, PORTAIL_URL } = environment;

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [oidcClient, setOidcClient] = useState(() => {
    switch (AUTH_TYPE) {
      case OIDC:
        return null;
      case NONE:
        return dummyOidcClient;
      default:
        throw new Error(errorDictionary.noAuthFile);
    }
  });

  useEffect(() => {
    if (AUTH_TYPE !== OIDC) {
      return;
    }

    (async () => {
      const oidcClient = await createOidcClient({
        url: oidcConf.authUrl,
        realm: oidcConf.realm,
        clientId: oidcConf.client_id,
        identityProvider: IDENTITY_PROVIDER,
        urlPortail: PORTAIL_URL,
        evtUserActivity: listenActivity,
      });

      setOidcClient(oidcClient);
    })();
  }, []);

  if (oidcClient === null) return <LoaderSimple />;

  return (
    <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
  );
}
