import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'App';
import { OidcProvider } from '@axa-fr/react-oidc-context';
import { LoaderSimple } from 'components/shared/loader';
import { buildOidcConfiguration } from 'utils/oidc/build-configuration';
import { errorDictionary } from 'i18n';
import { ErrorFallback } from 'components/shared/error';
import { getOidcFile } from 'utils/configuration';

const AuthProviderOIDC = ({ children }) => {
  const conf = useContext(AppContext);
  const [oidcConf, setOidcConf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOidcFile()
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

  if (loading) return <LoaderSimple />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <OidcProvider
      loadingComponent={LoaderSimple}
      // sessionLostComponent={LoaderLogo}
      authenticating={LoaderSimple}
      callbackSuccessComponent={LoaderSimple}
      configuration={oidcConf}
    >
      {children}
    </OidcProvider>
  );
};

export default AuthProviderOIDC;
