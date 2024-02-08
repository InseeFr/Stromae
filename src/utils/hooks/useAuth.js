/* eslint-disable react-hooks/rules-of-hooks */
import { AuthContext, getLogoutUrl } from 'components/auth/provider/component';
import { decodeJwt } from 'oidc-spa';
import { useOidc } from 'oidc-spa/react';
import { useContext, useMemo } from 'react';
import { OIDC } from 'utils/constants';
import { listenActivity } from 'utils/events';
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

export const useAutoLogout = () => {
  const { oidc } = useAuth();

  const {
    user: { exp: expirationTime },
  } = useUser();
  const logoutTimeInMiliseconds = expirationTime * 1000 - Date.now();

  if (AUTH_TYPE !== OIDC) {
    return;
  }

  let timer;

  const logoutIfIdle = async () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      console.log(
        `No user activity detected during ${
          logoutTimeInMiliseconds / 1000
        } seconds. Logout user.`
      );
      await oidc.logout({ redirectTo: 'specific url', url: getLogoutUrl() });
    }, logoutTimeInMiliseconds);
  };

  // Initial call to set the logout timer
  logoutIfIdle();
  // Event listeners to reset timer on user activity
  listenActivity(logoutIfIdle);
};
