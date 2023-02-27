export function surveyMetada(apiUrl: string, survey: string): string {
	return `${apiUrl}/api/questionnaire/${survey}/metadata`;
}

export function surveySource(apiUrl: string, survey: string) {
	return `${apiUrl}/api/questionnaire/${survey}`;
}

export function surveyUnitData(apiUrl: string, unit: string) {
	return `${apiUrl}/api/survey-unit/${unit}`;
}

export function requiredNomenclature(apiUrl: string, survey: string) {
	return `${apiUrl}/api/questionnaire/${survey}/required-nomenclatures`;
}

export function nomenclature(apiUrl: string, nomenclature: string) {
	return `${apiUrl}/api/nomenclature/${nomenclature}`;
}
