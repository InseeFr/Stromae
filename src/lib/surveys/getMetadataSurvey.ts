import HeaderType from "../../components/header/HeaderType";
import FooterType from "../../components/footer/FooterType";
import { publicRequest } from "../commons/axios-utils";
import * as API from "./api";

export interface MetadataSurvey {
  Header: HeaderType;
  Footer: FooterType;
}

const getMetadataSurvey =
  (BASE_URL: string) =>
  async (survey: string): Promise<MetadataSurvey> => {
    const url = API.getSurveyMetada(BASE_URL, survey);
    return publicRequest<MetadataSurvey>("get", url);
  };

export default getMetadataSurvey;
