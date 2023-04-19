export function uri404() {
	return '/404';
}

/**
 * ressource principale du site, affichant le questionnaire.
 * @param survey
 * @param unit
 * @returns
 */
export function uriSurveyUnit(survey?: string, unit?: string) {
	if (survey && unit) {
		return `/questionnaire/${survey}/unite-enquetee/${unit}`;
	} else throw new Error('Missing Element : survey or unit');
}

/**
 * ressource invoquée par l'utilisateur pour finaliser le questionnaire.
 * @param survey
 * @param unit
 * @returns
 */
export function uriPostEnvoi(survey?: string, unit?: string) {
	return `${uriSurveyUnit(survey, unit)}/post-envoi`;
}
