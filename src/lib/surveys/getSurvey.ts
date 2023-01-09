export interface Survey {
  sourceRef: string;
  dataRef: string;
}

/**
 * Un endpoint vers stromae-api pour recup les url spécifique à l'enquête plutôt que les coller dans l'url.
 * @param survey
 * @returns
 */
async function getSurvey(survey: string): Promise<Survey> {
  return { sourceRef: "/url", dataRef: "/url" };
}

export default getSurvey;
