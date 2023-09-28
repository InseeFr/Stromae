import { PropsWithChildren } from 'react';

import { LoadSourceData } from './LoadSourceData';
import { OrchestratorProps } from './Orchestrator';
import { UseLunatic } from './UseLunatic';

export function OrchestratorReadOnly({
	children,
	features,
	preferences,	
}: PropsWithChildren<OrchestratorProps>) {
	return (
		<LoadSourceData>
			<UseLunatic
				features={features}
				preferences={preferences}
				autoSuggesterLoading={false}
				paginated={true}
				disabled={true}
			>
				{children}
			</UseLunatic>
		</LoadSourceData>
	);
}