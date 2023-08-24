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

const conf = fetch('/configuration.json').then((data) => data.json());
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
	getSurvey: getSurvey(conf),
	getMetadataSurvey: getMetadataSurvey(conf),
	getSurveyUnitData: getSurveyUnitData(conf),
	getRequiredNomenclatures: getRequiredNomenclatures(conf),
	getNomenclature: getNomenclature(conf),
	putSurveyUnitData: putSurveyUnitData(conf),
	putSurveyUnitStateData: putSurveyUnitStateData(conf),
	getDepositiProof: getDepositProof(conf),
};
