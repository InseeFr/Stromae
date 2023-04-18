import { PropsWithChildren } from 'react';

import { OrchestratedElement } from '../../typeStromae/type';
import { CloneElements } from '../orchestrator/CloneElements';

export function Grid(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	return (
		<div className="fr-col-12">
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-lg-7w fr-my-5w">
				<div className="fr-col-lg-6 fr-col-md-9 fr-col-12">
					<CloneElements<OrchestratedElement> {...rest}>
						{children}
					</CloneElements>
				</div>
			</div>
		</div>
	);
}
