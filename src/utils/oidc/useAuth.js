import { useOidc as useOidcAxa } from '@axa-fr/react-oidc';
import { OIDC } from 'utils/constants';
import { environment } from '../read-env-vars';

const { AUTH_TYPE } = environment;

export const useAuth = () => {
  if (AUTH_TYPE === OIDC) {
    /**
     * Assume this conditional hook does not break anything
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { login, logout, renewTokens, isAuthenticated } = useOidcAxa();
    return { login, logout, renewTokens, isAuthenticated };
  } else {
    return {
      login: (redirectUrl) => {
        if (redirectUrl) window.location.href = redirectUrl;
      },
      logout: (redirectUrl) => {
        if (redirectUrl) window.location.href = redirectUrl;
      },
      renewTokens: () => {},
      isAuthenticated: true,
    };
  }
};
