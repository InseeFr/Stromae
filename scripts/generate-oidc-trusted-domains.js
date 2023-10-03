const fs = require('fs');

const finalFilePath =
	process.env.npm_lifecycle_event === 'prestart'
		? './public/OidcTrustedDomains.js'
		: './build/OidcTrustedDomains.js';

fs.writeFileSync(
	finalFilePath,
	`self.importScripts('env-config.js');

const oidcServerOrigin = new URL(self?._env_?.REACT_APP_AUTHORITY || '${process.env.REACT_APP_AUTHORITY}' || '').origin;

const apiOrigin =
	self?._env_?.REACT_APP_SURVEY_API_BASE_URL || '${process.env.REACT_APP_SURVEY_API_BASE_URL}' || '';

const trustedDomains = {
	default: [oidcServerOrigin, apiOrigin],
	config_classic: [],
	config_without_silent_login: [],
	config_without_refresh_token: [],
	config_without_refresh_token_silent_login: [],
	config_google: [],
	config_with_hash: [],
};

`,
	'utf8'
);
