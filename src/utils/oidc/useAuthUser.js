import { useOidcUser } from '@axa-fr/react-oidc';
import { OIDC } from '../constants';
import { environment } from '../read-env-vars';

const { AUTH_TYPE } = environment;

export const useAuthUser = () => {
  if (AUTH_TYPE === OIDC) {
    /**
     * Assume this conditional hook does not break anything
     */
    const {
      oidcUser,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useOidcUser();
    return {
      oidcUser: {
        preferred_username: oidcUser?.preferred_username,
        sub: oidcUser?.sub,
      },
    };
  } else {
    return {
      oidcUser: { preferred_username: 'guest', sub: 'no-auth-session' },
    };
  }
};
