import { useOidc as useOidcAxa } from '@axa-fr/react-oidc';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

const { AUTH_TYPE } = environment;

export const useAuth = (): {
	login: (redirectUrl?: string) => void;
	logout: (redirectUrl?: string) => void;
	renewTokens: () => void;
	isAuthenticated: boolean;
} => {
	if (AUTH_TYPE === AuthTypeEnum.Oidc) {
		/**
		 * Assume this conditional hook does not break anything
		 */
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { login, logout, renewTokens, isAuthenticated } = useOidcAxa();
		return { login, logout, renewTokens, isAuthenticated };
	} else {
		return {
			login: (redirectUrl) => {
				if (redirectUrl) window.location.href = redirectUrl;
			},
			logout: (redirectUrl) => {
				if (redirectUrl) window.location.href = redirectUrl;
			},
			renewTokens: () => {},
			isAuthenticated: true,
		};
	}
};
