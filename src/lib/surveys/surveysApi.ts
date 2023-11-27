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

function transform(data: DataVariables) {
	// il faudra peut etre tenir compte des autres propriétés (EDITED...)
	return Object.entries(data).reduce((acc, [name, value]) => {
		return {
			...acc,
			[name]: {
				COLLECTED: value,
				EDITED: null,
				FORCED: null,
				INPUTED: null,
				PREVIOUS: null,
			},
		};
	}, {});
}

function createManagedAPI(domain: string) {
	let suData: SurveyUnitData;
	const getSurveyUnitDataHTTP = getSurveyUnitData(domain);
	const putSurveyUnitDataHTTP = putSurveyUnitData(domain);
	const putSurveyUnitStateDataHTTP = putSurveyUnitStateData(domain);

	return {
		putSurveyUnitStateData: async (
			state: StateData,
			unit: string,
			token: string
		) => {
			if (suData) {
				suData.stateData = state;
			}
			await putSurveyUnitStateDataHTTP(state, unit, token);
		},
		putSurveyUnitData: async (
			data: DataVariables,
			unit: string,
			token: string
		) => {
			if (suData) {
				const variables = suData.data;
				suData = {
					...suData,
					data: {
						...variables,
						COLLECTED: { ...variables.COLLECTED, ...transform(data) },
					},
				};
			}
			await putSurveyUnitDataHTTP(data, unit, token);
		},
		getSurveyUnitData: async (unit: string, token: string) => {
			if (suData) {
				return { ...suData };
			}

			// eslint-disable-next-line require-atomic-updates
			suData = await getSurveyUnitDataHTTP(unit, token);
			return suData;
		},
	};
}

const managed = createManagedAPI(DOMAIN);

export const surveyApi: SurveyApi = {
	getSurvey: getSurvey(DOMAIN),
	getMetadataSurvey: getMetadataSurvey(DOMAIN),
	getSurveyUnitData: managed.getSurveyUnitData,
	getRequiredNomenclatures: getRequiredNomenclatures(DOMAIN),
	getNomenclature: getNomenclature(DOMAIN),
	putSurveyUnitData: managed.putSurveyUnitData,
	putSurveyUnitStateData: managed.putSurveyUnitStateData,
	getDepositiProof: getDepositProof(DOMAIN),
};
