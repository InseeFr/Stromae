import { useContext } from 'react';
import { AppContext } from 'App';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { NONE, OIDC } from 'utils/constants';

export const useAuth = () => {
  const { authenticationType } = useContext(AppContext);
  if (authenticationType === NONE)
    return { authenticationType, name: 'Fake User' };
  if (authenticationType === OIDC) {
    /**
     * Assume this conditional hook does not break anything
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { oidcUser, login, logout } = useReactOidc();
    return { authenticationType, oidcUser, login, logout };
  }
  throw new Error(`Auth type ${authenticationType} is nor recognized`);
};
