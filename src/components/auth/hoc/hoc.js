import React, { useContext } from 'react';
import { AppContext } from 'App';
import { OidcSecure } from '@axa-fr/react-oidc-context';
import { NONE, OIDC } from 'utils/constants';

const secure = WrappedComponent => {
  const Component = props => {
    const { authenticationType } = useContext(AppContext);
    const { otherProps } = props;
    const ReturnedComponent = <WrappedComponent {...otherProps} />;
    if (authenticationType === NONE) return ReturnedComponent;
    if (authenticationType === OIDC)
      return <OidcSecure>{ReturnedComponent}</OidcSecure>;
    return <div>{`Auth type ${authenticationType} is nor recognized`}</div>;
  };
  return Component;
};

export default secure;
