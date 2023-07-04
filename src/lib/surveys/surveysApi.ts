import type {
	DataVariables,
	MetadataSurvey,
	StateData,
	SurveyUnitData,
} from '../../typeStromae/type';
import { LunaticSource } from '../../typeLunatic/type-source';

import { getMetadataSurvey } from './getMetadataSurvey';
import { getSurvey } from './getSurvey';
import { getSurveyUnitData } from './getSurveyUnit';
import { getRequiredNomenclatures } from './getRequiredNomenclatures';
import { getNomenclature } from './getNomenclature';
import { putSurveyUnitStateData } from './putSurveyUnitStateData';
import { putSurveyUnitData } from './putSurveyUnitData';
import { getDepositProof } from './getDepositProof';
import { getEnvVar } from '../../utils/configuration/env';

const DOMAIN: string = getEnvVar('REACT_APP_SURVEY_API_BASE_URL') ?? '';

export interface SurveyApi {
	// any type JSon lunatic
	getSurvey: (survey: string, token: string) => Promise<LunaticSource>;
	getSurveyUnitData: (unit: string, token: string) => Promise<SurveyUnitData>;
	getMetadataSurvey: (survey: string) => Promise<MetadataSurvey>;
	getRequiredNomenclatures: (
		survey: string,
		token: string
	) => Promise<Array<string>>;
	getNomenclature: (name: string, token: string) => Promise<Array<any>>;
	putSurveyUnitData: (
		data: DataVariables,
		unit: string,
		token: string
	) => Promise<void>;
	putSurveyUnitStateData: (
		stateData: StateData,
		unit: string,
		token: string
	) => Promise<void>;
	getDepositiProof: (unit: string, token: string) => Promise<BlobPart>;
}

export const surveyApi: SurveyApi = {
	getSurvey: getSurvey(DOMAIN),
	getMetadataSurvey: getMetadataSurvey(DOMAIN),
	getSurveyUnitData: getSurveyUnitData(DOMAIN),
	getRequiredNomenclatures: getRequiredNomenclatures(DOMAIN),
	getNomenclature: getNomenclature(DOMAIN),
	putSurveyUnitData: putSurveyUnitData(DOMAIN),
	putSurveyUnitStateData: putSurveyUnitStateData(DOMAIN),
	getDepositiProof: getDepositProof(DOMAIN),
};
