import { PropsWithChildren } from 'react';

export function Grid({ children }: PropsWithChildren) {
	return (
		<div className="fr-col-12 fr-container">
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-lg-7w fr-my-5w">
				<div className="fr-col-lg-6 fr-col-md-9 fr-col-12">{children}</div>
			</div>
		</div>
	);
}
