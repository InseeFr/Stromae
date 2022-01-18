import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'App';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
} from '@axa-fr/react-oidc-context';
import { LoaderLogo } from 'components/shared/loader';
import { buildOidcConfiguration } from 'utils/oidc/build-configuration';
import { errorDictionary } from 'i18n';
import { ErrorFallback } from 'components/shared/error';

const AuthProviderOIDC = ({ children }) => {
  const conf = useContext(AppContext);
  const [oidcConf, setOidcConf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/oidc.json`)
      .then(r => r.json())
      .then(r => {
        setOidcConf(
          buildOidcConfiguration({
            oidcConf: r.config,
            conf: conf,
          })
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(new Error(errorDictionary.noAuthFile));
      });
  }, [conf]);

  if (loading) return <LoaderLogo />;
  if (error) return <ErrorFallback error={error} />;
  return (
    <AuthenticationProvider
      configuration={oidcConf}
      isEnabled={true}
      UserStore={InMemoryWebStorage}
      callbackComponentOverride={LoaderLogo}
      authenticating={LoaderLogo}
      //notAuthorized={() => <ErrorFallback error={'r'} />}
      sessionLostComponent={LoaderLogo}
    >
      {children}
    </AuthenticationProvider>
  );
};

export default AuthProviderOIDC;
