declare global {
	interface Window {
		_env_: Record<string, string>;
	}
}

export enum SavingStrategyEnum {
	Complete = 'complete',
	Partial = 'partial',
}

export enum SavingTimeEnum {
	Sequence = 'sequence',
	Page = 'page',
}

export enum AuthTypeEnum {
	None = 'none',
	Oidc = 'oidc',
}

/**
 * This function reads environment variables in the order: (If a value is found, it stops.)
 *  - variables defined inside object window._env_ (env variable injected by environnment, docker)
 * @param varName : the variable name
 * @returns the value of variable name
 */
export const getEnvVar = (varName: string) => {
	// eslint-disable-next-line no-restricted-globals
	return self._env_[varName] || process.env[varName] || '';
};

export const environment = {
	DOMAIN: getEnvVar('REACT_APP_SURVEY_API_BASE_URL'),
	SAVING_STRATEGY:
		getEnvVar('REACT_APP_SAVING_STRATEGY') || SavingStrategyEnum.Complete,
	SAVING_TIME: getEnvVar('REACT_APP_SAVING_TIME') || SavingTimeEnum.Sequence,
	DEFAULT_SURVEY: getEnvVar('REACT_APP_DEFAULT_SURVEY') || 'recensement',
	AUTH_TYPE: getEnvVar('REACT_APP_AUTH_TYPE') || AuthTypeEnum.None,
};

export const oidcConf = {
	client_id: getEnvVar('REACT_APP_CLIENT_ID'),
	authority: getEnvVar('REACT_APP_AUTHORITY'),
	scope: 'openid profile email offline_access',
	service_worker_relative_url: '/OidcServiceWorker.js',
	service_worker_only: false,
};
