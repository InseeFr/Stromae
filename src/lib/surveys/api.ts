export function getSurveyMetada(apiUrl: string, survey: string): string {
	return `${apiUrl}/api/questionnaire/${survey}/metadata`;
}

export function surveySource(apiUrl: string, survey: string) {
	return `${apiUrl}/api/questionnaire/${survey}`;
}

export function surveyUnitData(apiUrl: string, unit: string) {
	return `${apiUrl}/api/survey-unit/${unit}`;
}
