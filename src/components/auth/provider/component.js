import { AppContext } from 'App';
import { LoaderSimple } from 'components/shared/loader';
import { errorDictionary } from 'i18n';
import React, { useContext, useEffect, useState } from 'react';
import { getOidc } from 'utils/configuration';
import { NONE, OIDC } from 'utils/constants';
import { listenActivity } from 'utils/events';
import { createOidcClient } from 'utils/auth';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const {
    authenticationType: authType,
    portail: urlPortail,
    identityProvider,
  } = useContext(AppContext);

  const [oidcClient, setOidcClient] = useState(() => {
    switch (authType) {
      case OIDC:
        return null;
      case NONE:
        return dummyOidcClient;
      default:
        throw new Error(errorDictionary.noAuthFile);
    }
  });

  useEffect(() => {
    if (authType !== OIDC) {
      return;
    }

    (async () => {
      const oidcConf = await getOidc();

      const oidcClient = await createOidcClient({
        url: oidcConf['auth-server-url'],
        realm: oidcConf['realm'],
        clientId: oidcConf['resource'],
        identityProvider: identityProvider,
        urlPortail,
        evtUserActivity: listenActivity,
      });

      setOidcClient(oidcClient);
    })();
  }, [authType, identityProvider, urlPortail]);

  if (oidcClient === null) return <LoaderSimple />;

  return (
    <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
  );
};

const dummyOidcClient = {
  isUserLoggedIn: true,
  accessToken: null,
  logout: () => (window.location.href = '/'),
};

export default AuthProvider;
