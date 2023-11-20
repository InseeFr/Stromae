import { PropsWithChildren } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';
import { Controls } from './Controls';
import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';

export type OrchestratorProps = {
	source?: LunaticSource;
	surveyUnitData?: SurveyUnitData;
	suggesterFetcher?: any;
	onChange?: (...args: any) => void;
	getReferentiel?: (name: string) => Promise<Array<unknown>>;
	activeControls?: boolean;
	autoSuggesterLoading?: boolean;
	features?: Array<string>;
	preferences?: Array<string>;
	savingType?: string;
	paginated?: boolean;
	disabled?: boolean;
	metadata?: MetadataSurvey;
};

/**
 *
 * @param param0
 * @returns
 */
export function Orchestrator({
	children,
	features,
	preferences,
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData>
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={true}
				paginated={true}
				activeControls={true}
			>
				<Controls>{children}</Controls>
			</UseLunatic>
		</LoadSourceData>
	);
}
