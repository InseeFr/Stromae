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
	/* Fake endpoint */
	getSurveyUnitStateData: () => Promise<StateData>;
}

/**
 *
 * StateData peut-être consommé à plusieurs endroit de l'application.
 * En l'absence d'un state manager, il faut trouver un moyen simple de partager son dernier état,
 * sans faire d'appels réseau dispensables.
 * il n'existe pas à proprement parlé de endpoint getSurveyUnitStateData côté API. on l'introduit pour faire simple ici,
 * mais opn pourrait aussin surchargé le gros get qui reccup data et state data.
 */
function manageSurveyUnitStateData(DOMAIN: string) {
	let stateData: StateData;
	const putHttp = putSurveyUnitStateData(DOMAIN);
	const getSuDataHttp = getSurveyUnitData(DOMAIN);

	async function putSuStateData(state: StateData, unit: string, token: string) {
		await putHttp(state, unit, token);
		stateData = state;
	}

	async function getSuData(unit: string, token: string) {
		const suData = await getSuDataHttp(unit, token);
		stateData = suData.stateData;
		return suData;
	}

	async function getSurveyUnitStateData() {
		return stateData;
	}
	return {
		putSurveyUnitStateData: putSuStateData,
		getSurveyUnitData: getSuData,
		getSurveyUnitStateData,
	};
}

const managedSuStateData = manageSurveyUnitStateData(DOMAIN);

export const surveyApi: SurveyApi = {
	getSurvey: getSurvey(DOMAIN),
	getMetadataSurvey: getMetadataSurvey(DOMAIN),
	getSurveyUnitData: managedSuStateData.getSurveyUnitData,
	getRequiredNomenclatures: getRequiredNomenclatures(DOMAIN),
	getNomenclature: getNomenclature(DOMAIN),
	putSurveyUnitData: putSurveyUnitData(DOMAIN),
	putSurveyUnitStateData: managedSuStateData.putSurveyUnitStateData,
	getSurveyUnitStateData: managedSuStateData.getSurveyUnitStateData,
	getDepositiProof: getDepositProof(DOMAIN),
};
