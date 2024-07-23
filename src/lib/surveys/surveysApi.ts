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
import { fectchSurveyUnitData, getSurveyUnitData } from './getSurveyUnit';
import { putSurveyUnitData } from './putSurveyUnitData';
import { putSurveyUnitStateData } from './putSurveyUnitStateData';

const { DOMAIN } = environment;
export interface SurveyApi {
	// any type JSon lunatic
	getSurvey: (
		survey: string,
		token: string | undefined
	) => Promise<LunaticSource>;
	getSurveyUnitData: (
		unit: string,
		token: string | undefined
	) => Promise<SurveyUnitData>;
	getFreshSurveyUnitData: (
		unit: string,
		token: string | undefined
	) => Promise<SurveyUnitData>;
	getMetadataSurvey: (survey: string) => Promise<MetadataSurvey>;
	getRequiredNomenclatures: (
		survey: string,
		token: string | undefined
	) => Promise<Array<string>>;
	getNomenclature: (
		name: string,
		token: string | undefined
	) => Promise<Array<any>>;
	putSurveyUnitData: (
		data: DataVariables,
		unit: string,
		token: string | undefined
	) => Promise<void>;
	putSurveyUnitStateData: (
		stateData: StateData,
		unit: string,
		token: string | undefined
	) => Promise<void>;
	getDepositiProof: (
		unit: string,
		token: string | undefined
	) => Promise<BlobPart>;
}

export const surveyApi: SurveyApi = {
	getSurvey: getSurvey(DOMAIN),
	getMetadataSurvey: getMetadataSurvey(DOMAIN),
	getSurveyUnitData: getSurveyUnitData(DOMAIN),
	getFreshSurveyUnitData: fectchSurveyUnitData(DOMAIN),
	getRequiredNomenclatures: getRequiredNomenclatures(DOMAIN),
	getNomenclature: getNomenclature(DOMAIN),
	putSurveyUnitData: putSurveyUnitData(DOMAIN),
	putSurveyUnitStateData: putSurveyUnitStateData(DOMAIN),
	getDepositiProof: getDepositProof(DOMAIN),
};
