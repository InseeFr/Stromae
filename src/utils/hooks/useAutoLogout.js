import { getLogoutUrl } from 'components/auth/provider/component';
import { decodeJwt } from 'oidc-spa';
import { OIDC } from 'utils/constants';
import { listenActivity } from 'utils/events';
import { environment } from '../read-env-vars';

const { AUTH_TYPE } = environment;

export const useAutoLogout = ({ oidc }) => {
  const { isUserLoggedIn, logout } = oidc;
  if (isUserLoggedIn && AUTH_TYPE === OIDC) {
    (async function callee() {
      const { exp: expirationTime } = decodeJwt(oidc?.getTokens()?.accessToken);
      const logoutTimeInMiliseconds = expirationTime * 1000 - Date.now();

      const logoutTimeout = setTimeout(async () => {
        console.log(
          `No user activity detected during ${
            logoutTimeInMiliseconds / 1000
          } seconds. Logout user.`
        );
        await logout({ redirectTo: 'specific url', url: getLogoutUrl() });
      }, logoutTimeInMiliseconds);

      await listenActivity();
      clearTimeout(logoutTimeout);
      callee();
    })();
  }
};
