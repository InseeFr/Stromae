/*
 * Page ressource non trouvée.
 */
export function uri404() {
	return '/404';
}

export function uri301(survey?: string) {
	return `/${survey ? `questionnaire/${survey}/301` : '301'}`;
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
