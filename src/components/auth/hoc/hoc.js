import { withOidcSecure } from '@axa-fr/react-oidc';
import { OIDC } from '../../../utils/constants';
import { environment } from '../../../utils/read-env-vars';

const { AUTH_TYPE } = environment;

const secure = (WrappedComponent) => {
  if (AUTH_TYPE === OIDC) return withOidcSecure(WrappedComponent);
  return WrappedComponent;
};

export default secure;
