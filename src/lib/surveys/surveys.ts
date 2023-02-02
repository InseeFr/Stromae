import { Survey } from "./getSurvey";
import getMetadataSurvey, { MetadataSurvey } from "./getMetadataSurvey"; 
import getSurvey from "./getSurvey";

export interface Surveys {
  getSurvey: (survey: string) => Promise<Survey>;
  getMetadataSurvey: (survey: string) => Promise<MetadataSurvey | undefined> 
}

const surveys: Surveys = {
  getSurvey,
  getMetadataSurvey
};

export default surveys;
