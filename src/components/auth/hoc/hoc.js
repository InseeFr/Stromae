import { decodeJwt } from 'oidc-spa';
import { listenActivity } from 'utils/events';
import { useAuth } from 'utils/hooks/useAuth';
import { getLogoutUrl } from '../provider/component';

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login, logout } = oidc;
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

    if (isUserLoggedIn) {
      (async function callee() {
        const { exp: expirationTime } = decodeJwt(oidc?.getTokens()?.idToken);

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
