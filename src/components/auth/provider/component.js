import React, { useEffect, useState } from 'react';
import { NONE, OIDC } from 'utils/constants';
import { useHistory } from 'react-router';
import { LoaderSimple } from 'components/shared/loader';
import { getOidc } from 'utils/configuration';
import { errorDictionary } from 'i18n';
import { ErrorFallback } from 'components/shared/error';
import { createKeycloakOidcClient } from 'utils/keycloak';

export const AuthContext = React.createContext();

const AuthProvider = ({ authType, children }) => {
  const [loading, setLoading] = useState(true);
  const [oidcConfig, setOidcConfig] = useState(null);
  const [oidcClient, setOidcClient] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory(); //TODO Do not call each time

  useEffect(() => {
    if (authType === NONE) {
      setLoading(false);
    }
    if (authType === OIDC && !oidcConfig) {
      getOidc()
        .then(oidcConf => {
          setOidcConfig(oidcConf);
        })
        .catch(() => {
          setLoading(false);
          setError(new Error(errorDictionary.noAuthFile));
        });
    }
  }, [authType, oidcConfig]);

  useEffect(() => {
    if (authType === OIDC && oidcConfig) {
      createKeycloakOidcClient(oidcConfig).then(config => {
        setLoading(false);
        setOidcClient(config);
      });
    }
  }, [oidcConfig, authType]);

  if (loading) return <LoaderSimple />;
  if (error) return <ErrorFallback error={error} />;

  if (authType === NONE) {
    const context = {
      isUserLoggedIn: true,
      getAccessToken: () => null,
      logout: () => history.push('/'),
    };
    return (
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
  }
  if (authType === OIDC && oidcClient) {
    return (
      <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
    );
  }
  return <div>{`Auth type ${authType} is not recognized`}</div>;
};

export default AuthProvider;
