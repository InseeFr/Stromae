import { createContext } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import {
	DataVariables,
	StateData,
	SurveyUnitData,
	MetadataSurvey,
} from '../../typeStromae/type';

export type LoadSourceDataContextType = {
	getMetadata: () => Promise<MetadataSurvey | undefined>;
	getSurvey: () => Promise<LunaticSource | undefined>;
	getSurveyUnitData?: () => Promise<SurveyUnitData | undefined>;
	getReferentiel: (name: string) => Promise<Array<unknown>>;
	/* */
	putSurveyUnitData: (data?: DataVariables) => Promise<boolean>;
	putSurveyUnitStateData: (state?: StateData) => Promise<boolean>;
	getSurveyUnitStateData: () => Promise<StateData | undefined>;
	getDepositProof: (unit: string) => Promise<BlobPart>;
};

const DEFAULT = {
	getReferentiel: async (name: string) => [],
	getMetadata: async () => undefined,
	getSurvey: async () => undefined,
	getSurveyUnitData: async () => undefined,
	/* */
	putSurveyUnitData: async () => true,
	putSurveyUnitStateData: async () => true,
	getDepositProof: async () => new Blob(),
	getSurveyUnitStateData: async () => undefined,
};

export const loadSourceDataContext =
	createContext<LoadSourceDataContextType>(DEFAULT);
