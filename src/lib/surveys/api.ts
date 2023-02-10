export function getSurveyMetada(apiUrl: string, survey: string): string {
  return `${apiUrl}/api/questionnaire/${survey}/metadata`;
}
