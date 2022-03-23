import React, { useContext } from 'react';
import { AuthContext } from '../provider';

const secure = WrappedComponent => {
  const Component = props => {
    const { isUserLoggedIn, login } = useContext(AuthContext);
    const { otherProps } = props;

    const ReturnedComponent = <WrappedComponent {...otherProps} />;

    if (isUserLoggedIn) {
      return ReturnedComponent;
    }
    login();
    return null;
  };

  return Component;
};

export default secure;
