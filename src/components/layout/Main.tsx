import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren<{ id: string }>;

export function Main({ children, id }: MainProps) {
	return (
		<main className="fr-container" id={id}>
			{children}
		</main>
	);
}
