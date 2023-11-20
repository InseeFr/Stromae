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
	return window?._env_[varName] || process.env[varName] || '';
};

export const environment = {
	DOMAIN: getEnvVar('REACT_APP_SURVEY_API_BASE_URL'),
	SAVING_STRATEGY:
		getEnvVar('REACT_APP_SAVING_STRATEGY') || SavingStrategyEnum.Complete,
	SAVING_TIME: getEnvVar('REACT_APP_SAVING_TIME') || SavingTimeEnum.Sequence,
	DEFAULT_SURVEY: getEnvVar('REACT_APP_DEFAULT_SURVEY') || 'recensement',
	// Not Yet Implemented
	AUTH_TYPE: getEnvVar('REACT_APP_AUTH_TYPE') || AuthTypeEnum.None,
	// VISUALIZE is disabled by default, so if value is not present and not set to true in env-config.js, VISUALIZE page is disabled
	VIZUALIZE_ENABLED: getEnvVar('REACT_APP_VIZUALIZE_ENABLED') || false,
	DEBUG: Boolean(getEnvVar('REACT_APP_DEBUG') || false)
};
