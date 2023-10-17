import { TokenRenewMode } from '@axa-fr/oidc-client';
import { OidcProvider } from '@axa-fr/react-oidc';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { OIDC, READ_ONLY } from '../../../utils/constants';
import { useAsyncEffect } from '../../../utils/hooks/useAsyncEffect';
import { environment, oidcConf } from '../../../utils/read-env-vars';
import { Button } from '../../designSystem';
import { LoaderSimple } from '../../shared/loader';

const SessionLostComponent = () => (
  <>
    <h1 className=''>Vous avez été déconnecté.</h1>
    <p>
      Vos réponses ont été sauvegardées, vous pourrez ainsi compléter
      ultèrieurement votre questionnaire.
    </p>
    <Button
      onClick={() => {
        window.location = window.location.href;
      }}
    >
      Se reconnecter
    </Button>
  </>
);

const AuthenticatingErrorComponent = () => (
  <h1>Erreur lors de l'authentification</h1>
);

const ServiceWorkerNotSupportedComponent = () => (
  <>
    <h1 className=''>
      Vous ne pouvez pas vous connecter au questionnaire avec ce navigateur.
    </h1>
    <p>
      Votre navigateur n'est pas sécurisé. Veuillez le mettre à jour ou utiliser
      un navigateur plus récent.
    </p>
  </>
);

const { AUTH_TYPE, IDENTITY_PROVIDER } = environment;

export function AuthProvider({ children }) {
  const isOidcEnabled = AUTH_TYPE === OIDC;
  const isReadOnlyMode = window.location.pathname.startsWith(`/${READ_ONLY}`);
  const alreadyLoad = useRef(false);
  const [configuration, setConfiguration] = useState(undefined);

  useAsyncEffect(async () => {
    if (alreadyLoad.current) {
      return;
    }
    alreadyLoad.current = true;
    if (isOidcEnabled) {
      const extras = isReadOnlyMode ? { kc_idp_hint: IDENTITY_PROVIDER } : null;
      setConfiguration({
        ...oidcConf,
        redirect_uri: `${window.location.origin}/login`,
        extras: extras,
        token_request_extras: extras,
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
        sessionLostComponent={SessionLostComponent}
        authenticatingErrorComponent={AuthenticatingErrorComponent}
        serviceWorkerNotSupportedComponent={ServiceWorkerNotSupportedComponent}
      >
        {children}
      </OidcProvider>
    );
  }
  if (isOidcEnabled && !configuration) return <LoaderSimple />;
  return <>{children}</>;
}

AuthProvider.prototype = {
  children: PropTypes.node.isRequired,
};
