export function surveyMetada(domain: string, survey: string): string {
	return `${domain}/api/questionnaire/${survey}/metadata`;
}

export function surveySource(domain: string, survey: string) {
	return `${domain}/api/questionnaire/${survey}`;
}

export function surveyUnit(domain: string, unit: string) {
	return `${domain}/api/survey-unit/${unit}`;
}

export function surveyUnitDataUrl(domain: string, unit: string) {
	return `${domain}/api/survey-unit/${unit}/data`;
}

export function surveyUnitStateDataUrl(domain: string, unit: string) {
	return `${domain}/api/survey-unit/${unit}/state-data`;
}

export function requiredNomenclature(domain: string, survey: string) {
	return `${domain}/api/questionnaire/${survey}/required-nomenclatures`;
}

export function nomenclature(domain: string, nomenclature: string) {
	return `${domain}/api/nomenclature/${nomenclature}`;
}
