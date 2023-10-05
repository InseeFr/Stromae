import { TokenRenewMode } from '@axa-fr/oidc-client';
import { OidcProvider } from '@axa-fr/react-oidc';
import { useRef, useState } from 'react';
import { OIDC } from '../../../utils/constants';
import { useAsyncEffect } from '../../../utils/hooks/useAsyncEffect';
import { environment, oidcConf } from '../../../utils/read-env-vars';
import { LoaderSimple } from '../../shared/loader';

const { AUTH_TYPE } = environment;

export function AuthProvider({ children }) {
  const isOidcEnabled = AUTH_TYPE === OIDC;
  const alreadyLoad = useRef(false);
  const [configuration, setConfiguration] = useState(undefined);
  useAsyncEffect(async () => {
    if (alreadyLoad.current) {
      return;
    }
    alreadyLoad.current = true;
    if (isOidcEnabled) {
      setConfiguration({
        ...oidcConf,
        redirect_uri: `${window.location.origin}/login`,
        token_renew_mode: TokenRenewMode.access_token_invalid,
        refresh_time_before_tokens_expiration_in_second: 40,
      });
    }
  }, [alreadyLoad]);

  if (isOidcEnabled && configuration !== undefined) {
    return (
      <OidcProvider
        configuration={configuration}
        loadingComponent={LoaderSimple}
        authenticatingComponent={LoaderSimple}
        callbackSuccessComponent={LoaderSimple}
        sessionLostComponent={LoaderSimple}
        authenticatingErrorComponent={() => (
          <h1>Erreur lors de l'authentification</h1>
        )}
        serviceWorkerNotSupportedComponent={() => (
          <>
            <h1 className=''>
              Vous ne pouvez pas vous connecter au questionnaire avec ce
              navigateur.
            </h1>
            <p>
              Votre navigateur n'est pas sécurisé. Veuillez le mettre à jour ou
              utiliser un navigateur plus récent.
            </p>
          </>
        )}
      >
        {children}
      </OidcProvider>
    );
  }
  if (isOidcEnabled && !configuration) return <LoaderSimple />;
  return <>{children}</>;
}
