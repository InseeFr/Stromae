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
	putSurveyUnitData: (sud?: {
		data: DataVariables;
		state: StateData;
	}) => Promise<boolean>;
};

const DEFAULT = {
	getReferentiel: async (name: string) => [],
	getMetadata: async () => undefined,
	getSurvey: async () => undefined,
	getSurveyUnitData: async () => undefined,
	/* */
	putSurveyUnitData: async () => true,
};

export const loadSourceDataContext =
	createContext<LoadSourceDataContextType>(DEFAULT);
