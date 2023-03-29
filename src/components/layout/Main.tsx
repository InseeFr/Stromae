import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren<{ id: string }>;

export function Main({ children, id }: MainProps) {
	return (
		<main className="fr-container" id={id}>
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-2w">
				{children}
			</div>
		</main>
	);
}
