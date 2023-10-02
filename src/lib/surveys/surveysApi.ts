import { LunaticSource } from '../../typeLunatic/type-source';
import type {
	DataVariables,
	MetadataSurvey,
	StateData,
	SurveyUnitData,
} from '../../typeStromae/type';
import { environment } from '../../utils/read-env-vars';
import { getDepositProof } from './getDepositProof';
import { getMetadataSurvey } from './getMetadataSurvey';
import { getNomenclature } from './getNomenclature';
import { getRequiredNomenclatures } from './getRequiredNomenclatures';
import { getSurvey } from './getSurvey';
import { getSurveyUnitData } from './getSurveyUnit';
import { putSurveyUnitData } from './putSurveyUnitData';
import { putSurveyUnitStateData } from './putSurveyUnitStateData';

const { DOMAIN } = environment;
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
