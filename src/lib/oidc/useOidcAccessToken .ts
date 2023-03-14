import { useOidcAccessToken as useOidcAccessTokenAxa } from '@axa-fr/react-oidc';

/** */
export function useOidcAccessToken(): {
	accessToken: string;
	accessTokenPayload: string;
} {
	const { accessToken, accessTokenPayload } = useOidcAccessTokenAxa();

	return { accessToken, accessTokenPayload };
}
