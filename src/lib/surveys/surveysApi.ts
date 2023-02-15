import { LunaticSource } from "../../typeLunatic/type-source";
import getMetadataSurvey, { MetadataSurvey } from "./getMetadataSurvey";
import getSurvey from "./getSurvey";
import getSurveyData from "./getSurveyData";

const BASE_URL: string = process.env.REACT_APP_SURVEY_API_BASE_URL || "";

export interface SurveyApi {
  getSurvey: (survey: string, token: string) => Promise<LunaticSource>; // any type JSon lunatic
  getSurveyData: (survey: string, unit: string, token: string) => Promise<any>;
  getMetadataSurvey: (survey: string) => Promise<MetadataSurvey>;
}

const surveyApi: SurveyApi = {
  getSurvey: getSurvey(BASE_URL),
  getMetadataSurvey: getMetadataSurvey(BASE_URL),
  getSurveyData: getSurveyData(BASE_URL),
};

export default surveyApi;
