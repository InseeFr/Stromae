import { PropsWithChildren, useEffect } from 'react';
import { CloneElements } from '../CloneElements';
import { OrchestratedElement } from '../Orchestrator';
import { useSaving } from './useSaving';
import { isComponentsContainSequence } from '../../../lib/commons/isComponentscontainSequence';

export function SaveOnSequence(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { currentChange, getData, getComponents } = rest;

	const save = useSaving({ currentChange, getData });

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
