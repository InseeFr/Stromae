export interface Survey {
  sourceRef: string;
  dataRef: string;
}

/**
 * Un endpoint vers stromae-api pour recup les url des resources.
 *
 * @param survey
 * @returns
 */
async function getSurvey(survey: string): Promise<Survey> {
  return { sourceRef: "/url", dataRef: "/url" };
}

export default getSurvey;
