// Add bellow trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users,
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const trustedDomains = {
	default: [
		'https://auth.insee.test',
		'https://api-questionnaire-recensement.developpement6.insee.fr',
	],
	config_classic: [],
	config_without_silent_login: [],
	config_without_refresh_token: [],
	config_without_refresh_token_silent_login: [],
	config_google: [],
	config_with_hash: [],
};
