import { Survey } from "./getSurvey";
import getSurvey from "./getSurvey";

export interface Surveys {
  getSurvey: (survey: string) => Promise<Survey>;
}

const surveys: Surveys = {
  getSurvey,
};

export default surveys;
