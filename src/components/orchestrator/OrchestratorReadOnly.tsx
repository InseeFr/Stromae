import { PropsWithChildren } from 'react';
import { LoadSourceData } from './LoadSourceData';
import { UseLunatic } from './UseLunatic';
import { OrchestratorProps } from './Orchestrator';
import { Controls } from './Controls';

export function OrchestratorReadOnly({
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
				autoSuggesterLoading={false}
				paginated={true}
				readOnly={readOnly}
			>
				<Controls>{children}</Controls>
			</UseLunatic>
		</LoadSourceData>
	);
}
