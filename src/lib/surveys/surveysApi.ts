import { Survey } from "./getSurvey";
import getMetadataSurvey, { MetadataSurvey } from "./getMetadataSurvey";
import getSurvey from "./getSurvey";

export interface SurveyApi {
  getSurvey: (survey: string, token: string) => Promise<Survey>;
  getMetadataSurvey: (survey: string) => Promise<MetadataSurvey>;
}

const surveyApi: SurveyApi = {
  getSurvey,
  getMetadataSurvey,
};

export default surveyApi;
