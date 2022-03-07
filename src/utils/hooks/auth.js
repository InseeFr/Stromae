import { useContext } from 'react';
import { AppContext } from 'App';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc-context';
import { NONE, OIDC } from 'utils/constants';
import { useHistory } from 'react-router';

export const useAuth = () => {
  const history = useHistory();
  const { authenticationType } = useContext(AppContext);
  if (authenticationType === NONE)
    return {
      authenticationType,
      name: 'Fake User',
      logout: () => history.push('/'),
    };
  if (authenticationType === OIDC) {
    /**
     * Assume this conditional hook does not break anything
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { login, logout } = useOidc();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { oidcUser } = useOidcUser();

    return { authenticationType, oidcUser, login, logout };
  }
  throw new Error(`Auth type ${authenticationType} is not recognized`);
};
