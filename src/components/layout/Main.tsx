import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren<{ id: string }>;

export function Main({ children, id }: MainProps) {
	return (
		<main id={id} role="main">
			<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle">
				{children}
			</div>
		</main>
	);
}
