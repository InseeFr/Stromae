import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../orchestrator';
import { CloneElements } from '../orchestrator/CloneElements';

export function Grid(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	return (
		<div className="What you want Julia!">
			<CloneElements<OrchestratedElement>{...rest}>{children}</CloneElements>
		</div>
	);
}
