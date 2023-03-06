import { MetadataSurvey } from '../../lib/surveys/getMetadataSurvey';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { createContext } from 'react';

export type LoadSourceDataContextType = {
	getMetadata: () => Promise<MetadataSurvey | undefined>;
	getSurvey: () => Promise<LunaticSource | undefined>;
	getSurveyUnitData?: () => Promise<SurveyUnitData | undefined>;
	getReferentiel: (name: string) => Promise<Array<unknown>>;
};

const DEFAULT = {
	getReferentiel: async (name: string) => [],
	getMetadata: async () => undefined,
	getSurvey: async () => undefined,
	getSurveyUnitData: async () => undefined,
};

export const loadSourceDataContext =
	createContext<LoadSourceDataContextType>(DEFAULT);
