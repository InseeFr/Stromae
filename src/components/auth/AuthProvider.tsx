import { useEffect, useState } from "react";
import { OidcProvider, OidcConfiguration } from "@axa-fr/react-oidc";
import axios from "axios";

function Pending() {
  return <div>Please waiting...</div>;
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
      const { location } = window;
      const { origin } = location;
      const conf = await fetchConfig();
      setConfiguration({
        ...conf,
        redirect_uri: `${origin}/welcome`,
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
