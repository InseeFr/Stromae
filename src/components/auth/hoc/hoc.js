import { decodeJwt } from 'oidc-spa';
import { OIDC } from 'utils/constants';
import { listenActivity } from 'utils/events';
import { useAuth } from 'utils/hooks/useAuth';
import { environment } from 'utils/read-env-vars';
import { getLogoutUrl } from '../provider/component';

const { AUTH_TYPE } = environment;

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login, logout } = oidc;
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

    if (isUserLoggedIn) {
      if (AUTH_TYPE === OIDC) {
        (async function callee() {
          const { exp: expirationTime } = decodeJwt(
            oidc?.getTokens()?.accessToken
          );
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

      return ReturnedComponent;
    }
    login({
      doesCurrentHrefRequiresAuth: true,
    });
    return null;
  };

  return Component;
};

export default secure;
