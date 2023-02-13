import { useEffect, useState } from "react";
import LayoutSkeleton from "../skeleton/Layout";
import {
  OidcProvider,
  OidcConfiguration,
  TokenRenewMode,
} from "@axa-fr/react-oidc";
import axios from "axios";

function Pending() {
  return <LayoutSkeleton />;
}

type AuthProviderProps = {
  children: JSX.Element;
};

function fetchConfig(): Promise<OidcConfiguration> {
  return axios
    .get<OidcConfiguration>("/configuration.json")
    .then(function (response) {
      const { data } = response;
      return data;
    })
    .catch(function (error) {
      throw error;
    });
}

function AuthProvider({ children }: AuthProviderProps) {
  const [configuration, setConfiguration] = useState<
    OidcConfiguration | undefined
  >(undefined);
  useEffect(function () {
    (async function () {
      const conf = await fetchConfig();
      setConfiguration({
        ...conf,
        redirect_uri: `${window.location.origin}/login`,
        token_renew_mode: TokenRenewMode.access_token_invalid,
        refresh_time_before_tokens_expiration_in_second: 40,
      });
    })();
  }, []);

  if (configuration !== undefined) {
    return (
      <OidcProvider configuration={configuration}>{children}</OidcProvider>
    );
  }
  return <Pending />;
}

export default AuthProvider;
