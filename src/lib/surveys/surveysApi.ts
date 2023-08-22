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

interface Configuration {
  REACT_APP_SURVEY_API_BASE_URL: string;
}

const getFile = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

const getConfiguration = async (): Promise<Configuration> => {
  return getFile<Configuration>(`${window.location.origin}/configuration.json`);
};

let domain = '';

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

// Fetch the configuration and set DOMAIN synchronously
// eslint-disable-next-line no-return-assign
getConfiguration().then((config) =>
	domain = config.REACT_APP_SURVEY_API_BASE_URL)
	.catch(error => {
  // eslint-disable-next-line no-console
  console.error('Error fetching configuration:', error);
});



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
