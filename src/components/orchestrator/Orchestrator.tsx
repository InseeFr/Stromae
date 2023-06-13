import { PropsWithChildren } from 'react';

import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';

import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';
import { Controls } from './Controls';
import { Saving } from './Saving';

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
	readOnly?: boolean;
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
	readOnly,
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData>
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={true}
				paginated={true}
				activeControls={true}
				readOnly={readOnly}
			>
				<Saving>
					<Controls>{children}</Controls>
				</Saving>
			</UseLunatic>
		</LoadSourceData>
	);
}
