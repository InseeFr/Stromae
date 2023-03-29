import { PropsWithChildren, useEffect } from 'react';
import { ComponentType } from '../../../typeLunatic/type-source';
import { CloneElements } from '../CloneElements';
import { OrchestratedElement } from '../Orchestrator';
import { useSaving } from './useSaving';

export const SAVING_STRATEGY = process.env.SAVING_STRATEGY || 'partial'; // or complete

function isComponentsContainSequence(
	components: Array<ComponentType>
): boolean {
	return components.reduce(function (status, component) {
		const { componentType } = component;
		return status || componentType === 'Sequence';
	}, false);
}

export function SaveOnSequence(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { currentChange, getData, getComponents } = rest;

	const save = useSaving({ strategy: SAVING_STRATEGY, currentChange, getData });

	useEffect(
		function () {
			if (getComponents) {
				const isSequence = isComponentsContainSequence(getComponents());
				if (isSequence) {
					(async function () {
						try {
							await save();
						} catch (e) {}
					})();
				}
			}
		},
		[getComponents, save]
	);

	return (
		<CloneElements<OrchestratedElement> {...rest}>{children}</CloneElements>
	);
}
