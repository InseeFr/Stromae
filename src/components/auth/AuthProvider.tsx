import { useEffect, useState, useRef } from "react";
import {
  OidcProvider,
  OidcConfiguration,
  TokenRenewMode,
} from "@axa-fr/react-oidc";
import { publicRequest, HTTP_VERBS } from "../../lib/commons/axios-utils";

function Pending() {
  return <div>Display Something... JULIA!</div>;
}

type AuthProviderProps = {
  children: JSX.Element;
};

function fetchConfig(): Promise<OidcConfiguration> {
  return publicRequest<OidcConfiguration>(
    HTTP_VERBS.get,
    "/configuration.json"
  );
}

function AuthProvider({ children }: AuthProviderProps) {
  const alreadyLoad = useRef(false);
  const [configuration, setConfiguration] = useState<
    OidcConfiguration | undefined
  >(undefined);
  useEffect(
    function () {
      if (!alreadyLoad.current) {
        alreadyLoad.current = true;
        (async function () {
          const conf = await fetchConfig();
          setConfiguration({
            ...conf,
            redirect_uri: `${window.location.origin}/login`,
            token_renew_mode: TokenRenewMode.access_token_invalid,
            refresh_time_before_tokens_expiration_in_second: 40,
          });
        })();
      }
    },
    [alreadyLoad]
  );

  if (configuration !== undefined) {
    return (
      <OidcProvider configuration={configuration}>{children}</OidcProvider>
    );
  }
  return <Pending />;
}

export default AuthProvider;
