import { useAuth } from 'utils/hooks/useAuth';
import { useAutoLogout } from 'utils/hooks/useAutoLogout';

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login } = oidc;
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

    useAutoLogout({ oidc });

    if (isUserLoggedIn) {
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
