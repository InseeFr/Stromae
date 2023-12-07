export function useOidcAccessToken(): {
	accessToken: string;
	accessTokenPayload: string;
} {
	return { accessToken: '', accessTokenPayload: '' };
}
