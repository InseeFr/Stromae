import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'App';
import {
  AuthenticationProvider,
  InMemoryWebStorage,
} from '@axa-fr/react-oidc-context';
import { Loader } from 'components/shared/loader';
import { buildOidcConfiguration } from 'utils/oidc/build-configuration';

const AuthProviderOIDC = ({ children }) => {
  const conf = useContext(AppContext);
  const [oidcConf, setOidcConf] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.location.origin}/keycloak.json`)
      .then(r => r.json())
      .then(r => {
        setOidcConf(r);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  return (
    <AuthenticationProvider
      configuration={buildOidcConfiguration({ oidcConf, conf })}
      isEnabled={true}
      UserStore={InMemoryWebStorage}
      callbackComponentOverride={Loader}
      authenticating={Loader}
      sessionLostComponent={Loader}
    >
      {children}
    </AuthenticationProvider>
  );
};

export default AuthProviderOIDC;
