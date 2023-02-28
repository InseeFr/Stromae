import { useOidcAccessToken as useOidcAccessTokenAxa } from "@axa-fr/react-oidc";

/** */
function useOidcAccessToken(): {
  accessToken: string;
  accessTokenPayload: string;
} {
  const { accessToken, accessTokenPayload } = useOidcAccessTokenAxa();

  return { accessToken, accessTokenPayload };
}

export default useOidcAccessToken;
