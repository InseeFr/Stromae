import { PropsWithChildren, cloneElement } from 'react';
import { OrchestratedElement } from './Orchestrator';

export function CloneElements(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const effective = Array.isArray(children) ? children : [children];
	return (
		<>
			{effective.map(function (element, key) {
				return cloneElement(
					element as React.ReactElement<OrchestratedElement>,
					{
						...rest,
						key,
					}
				);
			})}
		</>
	);
}
