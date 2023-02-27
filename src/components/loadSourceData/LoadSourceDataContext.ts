import { MetadataSurvey } from '../../lib/surveys/getMetadataSurvey';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { createContext } from 'react';

export type LoadSourceDataContextType = {
	getMetadata?: () => Promise<MetadataSurvey | undefined>;
	getSurvey?: () => Promise<LunaticSource | undefined>;
	getSurveyUnitData?: () => Promise<SurveyUnitData | undefined>;
	getRequiredNomenclatures?: () => Promise<
		Record<string, Array<any>> | undefined
	>;
};

export const loadSourceDataContext = createContext<LoadSourceDataContextType>(
	{}
);
