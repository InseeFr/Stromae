/* eslint-disable react-hooks/rules-of-hooks */
import { AuthContext } from 'components/auth/provider/component';
import { decodeJwt } from 'oidc-spa';
import { useOidc } from 'oidc-spa/react';
import { useContext, useMemo } from 'react';
import { OIDC } from 'utils/constants';
import { environment } from 'utils/read-env-vars';

const { AUTH_TYPE } = environment;

export const useAuth = () => {
  if (AUTH_TYPE === OIDC) {
    return useOidc();
  } else {
    const dummyClient = useContext(AuthContext);
    return { oidc: dummyClient };
  }
};

export const useUser = () => {
  const { oidc } = useAuth();

  if (!oidc.isUserLoggedIn) {
    throw new Error('This hook should be used only on authenticated routes');
  }

  const { idToken } = oidc.getTokens();

  const user = useMemo(() => {
    if (AUTH_TYPE === OIDC) return decodeJwt(idToken);
    return { preferred_username: null, sub: '' };
  }, [idToken]);

  return { user };
};
