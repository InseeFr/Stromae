import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren<{ id: string }>;

export function Main({ children, id }: MainProps) {
	return (
		<main className="fr-container" id={id}>
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-6w fr-mb-6w">
				<div className="fr-col-lg-6 fr-col-12">{children}</div>
			</div>
		</main>
	);
}
