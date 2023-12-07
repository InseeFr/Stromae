import { useOidc as useOidcAxa } from '@axa-fr/react-oidc';

export function useOidc(): {
	login: (redirectUrl?: string) => void;
	logout: (redirectUrl?: string) => void;
	renewTokens: () => void;
	isAuthenticated: boolean;
} {
	return {
		login: () => null,
		logout: () => null,
		renewTokens: () => null,
		isAuthenticated: true,
	};
	const { login, logout, renewTokens, isAuthenticated } = useOidcAxa();
	return { login, logout, renewTokens, isAuthenticated };
}
