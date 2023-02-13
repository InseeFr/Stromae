export function getSurveyMetada(apiUrl: string, survey: string): string {
  return `${apiUrl}/api/questionnaire/${survey}/metadata`;
}

export function getSurveySource(apiUrl: string, survey: string) {
  return `${apiUrl}/api/questionnaire/${survey}`;
}

export function getSurveyData(apiUrl: string, survey: string) {
  return `${apiUrl}/api/questionnaire/${survey}`;
}
