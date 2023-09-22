/*
 * Page ressource non trouvée.
 */
export function uri404() {
	return '/404';
}

export function uri301(survey?: string, message?: string) {
	const surveyUrl = survey ? `questionnaire/${survey}/301` : '301';
	let status = '/temporairement-indisponible';
	// TODO: access error status directly from API
	// 301 error can be reached either before or after the collection period
	// Depending on whether it is before or after, we need to display a different message
	// At the moment, the only differentiating information that we get from the API is in the `message`
	if (message?.includes('cloturée')) {
		status = '/post-collecte';
	} else if (message?.includes('pas encore ouverte')) {
		status = '/pre-collecte';
	}
	return `/${surveyUrl}${status}`;
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
