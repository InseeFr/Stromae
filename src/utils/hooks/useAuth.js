/* eslint-disable react-hooks/rules-of-hooks */
import { decodeJwt } from 'oidc-spa';
import { useMemo } from 'react';
import { OIDC } from 'utils/constants';
import { useOidc } from 'utils/oidc';
import { environment } from 'utils/read-env-vars';

const { AUTH_TYPE } = environment;

export const useUser = () => {
  const oidc = useOidc();

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
