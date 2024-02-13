import { useOidc } from 'utils/oidc';

const secure = (WrappedComponent) => {
  const Component = (props) => {
    const oidc = useOidc();
    const { isUserLoggedIn, login } = oidc;
    const { otherProps } = props;

    if (isUserLoggedIn) {
      return <WrappedComponent {...otherProps} />;
    }
    login({
      doesCurrentHrefRequiresAuth: true,
    });
    return null;
  };

  return Component;
};

export default secure;
