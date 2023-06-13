import { PropsWithChildren } from 'react';

type LunaticComponentContainerProps = PropsWithChildren<{ id: string }>;

export function LunaticComponentContainer({
	children,
	id,
}: LunaticComponentContainerProps) {
	return (
		<div
			className="lunatic-component-with-dsfr fr-mb-2w"
			id={`lunatic-component-${id}`}
		>
			{children}
		</div>
	);
}
