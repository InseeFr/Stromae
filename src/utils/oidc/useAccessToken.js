import { useOidcAccessToken as useOidcAccessTokenAxa } from '@axa-fr/react-oidc';
import { OIDC } from '../constants';
import { environment } from '../read-env-vars';

const { AUTH_TYPE } = environment;

export function useAccessToken() {
  if (AUTH_TYPE === OIDC) {
    /**
     * Assume this conditional hook does not break anything
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { accessToken, accessTokenPayload } = useOidcAccessTokenAxa();
    return { accessToken, accessTokenPayload };
  } else {
    return { accessToken: undefined, accessTokenPayload: undefined };
  }
}
