import HeaderType from "../../components/header/HeaderType";
import FooterType from "../../components/footer/FooterType";
import { publicRequest } from "../commons/axios-utils";
import * as API from "./api";

const BASE_URL: string = process.env.REACT_APP_SURVEY_API_BASE_URL || "";

export interface MetadataSurvey {
  Header: HeaderType;
  Footer: FooterType;
}

async function getMetadataSurvey(survey: string): Promise<MetadataSurvey> {
  const url = API.getSurveyMetada(BASE_URL, survey);
  return publicRequest<MetadataSurvey>("get", url);
}

export default getMetadataSurvey;
