import { LogoutModal } from 'components/modals/logout';
import { useOidc } from 'utils/oidc';

export const secure = (WrappedComponent) => {
  const Component = (props) => {
    const oidc = useOidc();
    const { isUserLoggedIn } = oidc;
    const { otherProps } = props;

    if (isUserLoggedIn) {
      return <WrappedComponent {...otherProps} />;
    } else return <LogoutModal />;
  };

  return Component;
};
