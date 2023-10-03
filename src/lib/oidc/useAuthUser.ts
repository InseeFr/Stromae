import { useOidcUser } from '@axa-fr/react-oidc';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

const { AUTH_TYPE } = environment;

export const useAuthUser = (): {
	oidcUser: { preferred_username: string | undefined };
} => {
	if (AUTH_TYPE === AuthTypeEnum.Oidc) {
		/**
		 * Assume this conditional hook does not break anything
		 */
		const {
			oidcUser,
			// eslint-disable-next-line react-hooks/rules-of-hooks
		} = useOidcUser();
		return { oidcUser: { preferred_username: oidcUser?.preferred_username } };
	} else {
		return {
			oidcUser: { preferred_username: 'guest' },
		};
	}
};
