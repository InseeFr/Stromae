import * as API from "./api";
import { authenticatedRequest, HTTP_VERBS } from "../commons/axios-utils";
import { LunaticSource } from "../../typeLunatic/type-source";

/**
 * Un endpoint vers stromae-api pour recup les url des resources.
 *
 * @param survey
 * @returns
 */
const getSurvey =
  (BASE_URL: string) =>
  async (survey: string, token: string): Promise<LunaticSource> => {
    const sourceRequest = await authenticatedRequest<any>(
      HTTP_VERBS.get,
      API.getSurveySource(BASE_URL, survey),
      token
    );
    return sourceRequest;
  };

export default getSurvey;
