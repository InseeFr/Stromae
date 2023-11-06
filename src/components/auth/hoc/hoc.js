import { useAuth } from 'utils/hooks/useAuth';

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const { oidc } = useAuth();
    const { isUserLoggedIn, login } = oidc;
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

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
