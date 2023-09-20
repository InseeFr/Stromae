/*
 * Page ressource non trouvée.
 */
export function uri404() {
	return '/404';
}

export function uri302(survey?: string) {
	return `/302${survey ? `/${survey}` : ''}`;
}

/*
 * ressource principale du site, affichant le questionnaire.
 */
export function uriSurveyUnit(survey?: string, unit?: string) {
	if (survey && unit) {
		return `/questionnaire/${survey}/unite-enquetee/${unit}`;
	}
	return uri404();
}

/*
 * ressource invoquée par l'utilisateur pour finaliser le questionnaire.
 */
export function uriPostEnvoi(survey?: string, unit?: string) {
	if (survey && unit) {
		return `/questionnaire/${survey}/unite-enquetee/${unit}/post-envoi`;
	}
	return uri404();
}
