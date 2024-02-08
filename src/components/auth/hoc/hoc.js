import { listenActivity } from 'utils/events';
import { useAuth } from 'utils/hooks/useAuth';
import { oidcConf } from 'utils/read-env-vars';
import { getLogoutUrl } from '../provider/component';

const { noActivityTimeoutInSeconds } = oidcConf;

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login, logout } = oidc;
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

    if (isUserLoggedIn) {
      (async function callee() {
        const logoutTimeout = setTimeout(async () => {
          console.log(
            `No user activity detected during ${noActivityTimeoutInSeconds} seconds. Logout user.`
          );
          await logout({ redirectTo: 'specific url', url: getLogoutUrl() });
        }, noActivityTimeoutInSeconds * 1000);

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
