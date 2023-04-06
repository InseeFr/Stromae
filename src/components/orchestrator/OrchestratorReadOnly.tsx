import { PropsWithChildren } from 'react';
import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';
import { OrchestratorProps } from './Orchestrator';

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
				activeControls={false}
			>
				{children}
			</UseLunatic>
		</LoadSourceData>
	);
}
