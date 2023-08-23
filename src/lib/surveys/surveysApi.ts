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
import { fetchConfig } from '../../components/auth/AuthProvider';

let domain = '';

const test = async () => {
	const conf = await fetchConfig();
	domain = conf.REACT_APP_SURVEY_API_BASE_URL;
};
test();
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
	getSurvey: getSurvey(domain),
	getMetadataSurvey: getMetadataSurvey(domain),
	getSurveyUnitData: getSurveyUnitData(domain),
	getRequiredNomenclatures: getRequiredNomenclatures(domain),
	getNomenclature: getNomenclature(domain),
	putSurveyUnitData: putSurveyUnitData(domain),
	putSurveyUnitStateData: putSurveyUnitStateData(domain),
	getDepositiProof: getDepositProof(domain),
};
