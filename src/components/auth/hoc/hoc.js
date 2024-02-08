import { useAuth } from 'utils/hooks/useAuth';
import { useAutoLogout } from 'utils/hooks/useAutoLogout';

const secure = (WrappedComponent) => {
  const ReturnedComponent = (props) => {
    useAutoLogout();
    return <WrappedComponent {...props} />;
  };

  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login } = oidc;
    const { otherProps } = props;

    if (isUserLoggedIn) {
      return <ReturnedComponent {...otherProps} />;
    }
    login({
      doesCurrentHrefRequiresAuth: true,
    });
    return null;
  };

  return Component;
};

export default secure;
