import React from 'react';
import { NONE, OIDC } from 'utils/constants';
import AuthProviderNone from './none';
import AuthProviderOIDC from './oidc';

const AuthProvider = ({ authType, children }) => {
  if (authType === NONE) return <AuthProviderNone>{children}</AuthProviderNone>;
  if (authType === OIDC) return <AuthProviderOIDC>{children}</AuthProviderOIDC>;
  return <div>{`Auth type ${authType} is not recognized`}</div>;
};

export default AuthProvider;
