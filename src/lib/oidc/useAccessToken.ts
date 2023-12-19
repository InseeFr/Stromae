import { useOidcAccessToken as useOidcAccessTokenAxa } from '@axa-fr/react-oidc';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

const { AUTH_TYPE } = environment;

export function useAccessToken(): {
	accessToken: string | undefined;
	accessTokenPayload: string | undefined;
} {
	if (AUTH_TYPE === AuthTypeEnum.Oidc) {
		/**
		 * Assume this conditional hook does not break anything
		 */
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { accessToken, accessTokenPayload } = useOidcAccessTokenAxa();
		return { accessToken, accessTokenPayload };
	} else {
		return { accessToken: undefined, accessTokenPayload: undefined };
	}
}
