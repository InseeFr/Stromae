import type { SurveyUnitData } from '../../typeStromae/type';
import { LunaticSource } from '../../typeLunatic/type-source';
import { getMetadataSurvey, MetadataSurvey } from './getMetadataSurvey';
import { getSurvey } from './getSurvey';
import { getSurveyUnitData } from './getSurveyUnitData';
import { getRequiredNomenclatures } from './getRequiredNomenclatures';
import { getNomenclature } from './getNomenclature';

const BASE_URL: string = process.env.REACT_APP_SURVEY_API_BASE_URL || '';

export interface SurveyApi {
	getSurvey: (survey: string, token: string) => Promise<LunaticSource>; // any type JSon lunatic
	getSurveyUnitData: (unit: string, token: string) => Promise<SurveyUnitData>;
	getMetadataSurvey: (survey: string) => Promise<MetadataSurvey>;
	getRequiredNomenclatures: (
		survey: string,
		token: string
	) => Promise<Array<string>>;
	getNomenclature: (name: string, token: string) => Promise<Array<any>>;
}

export const surveyApi: SurveyApi = {
	getSurvey: getSurvey(BASE_URL),
	getMetadataSurvey: getMetadataSurvey(BASE_URL),
	getSurveyUnitData: getSurveyUnitData(BASE_URL),
	getRequiredNomenclatures: getRequiredNomenclatures(BASE_URL),
	getNomenclature: getNomenclature(BASE_URL),
};
