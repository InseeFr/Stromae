import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'App';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
} from '@axa-fr/react-oidc-context';
import { LoaderLogo } from 'components/shared/loader';
import { buildOidcConfiguration } from 'utils/oidc/build-configuration';

const AuthProviderOIDC = ({ children }) => {
  const conf = useContext(AppContext);
  const [oidcConf, setOidcConf] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.location.origin}/oidc.json`)
      .then(r => r.json())
      .then(r => {
        setOidcConf(r);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoaderLogo />;
  return (
    <AuthenticationProvider
      configuration={buildOidcConfiguration({
        oidcConf: oidcConf.config,
        conf,
      })}
      isEnabled={oidcConf.isEnabled}
      UserStore={InMemoryWebStorage}
      callbackComponentOverride={LoaderLogo}
      authenticating={LoaderLogo}
      sessionLostComponent={LoaderLogo}
    >
      {children}
    </AuthenticationProvider>
  );
};

export default AuthProviderOIDC;
