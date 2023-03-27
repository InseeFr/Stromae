import { useCallback } from 'react';
import { PropsWithChildren } from 'react';
import { CloneElements } from '../CloneElements';
import { OrchestratedElement } from '../Orchestrator';
import { useSaving } from './useSaving';

export const SAVING_STRATEGY = process.env.SAVING_STRATEGY || 'partial'; // or complete

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { goNextPage, criticality, currentChange, getData } = rest;

	const save = useSaving({ strategy: SAVING_STRATEGY, currentChange, getData });

	const handleNextPage = useCallback(
		function () {
			(async function () {
				if (!criticality) {
					const result = await save();
					if (!result) {
						// TODO warn
						return;
					}
				}
				if (goNextPage) {
					goNextPage();
				}
			})();
		},
		[goNextPage, criticality, save]
	);

	return (
		<CloneElements<OrchestratedElement> {...rest} goNextPage={handleNextPage}>
			{children}
		</CloneElements>
	);
}
