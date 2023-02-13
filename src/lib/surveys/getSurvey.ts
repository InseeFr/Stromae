import * as API from "./api";
import { authenticatedRequest, HTTP_VERBS } from "../commons/axios-utils";

export interface Survey {
  source: {};
  data: {};
}

async function promiseAll(...args: Array<Promise<any>>): Promise<Array<any>> {
  return Promise.all(args).then(function (results) {
    return results;
  });
}

/**
 * Un endpoint vers stromae-api pour recup les url des resources.
 *
 * @param survey
 * @returns
 */
const getSurvey =
  (BASE_URL: string) =>
  async (survey: string, token: string): Promise<Survey> => {
    const sourceRequest = authenticatedRequest<any>(
      HTTP_VERBS.get,
      API.getSurveySource(BASE_URL, survey),
      token
    );
    const dataRequest = authenticatedRequest<any>(
      HTTP_VERBS.get,
      API.getSurveyData(BASE_URL, survey),
      token
    );
    // Promise.all([sourceUrl, dataUrl]).then(function (source,data) {});
    const wtf = await promiseAll(sourceRequest, dataRequest);
    debugger;
    return { source: {}, data: {} };
  };

export default getSurvey;
