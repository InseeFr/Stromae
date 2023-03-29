import { useCallback, useState } from 'react';
import { PropsWithChildren } from 'react';
import { CloneElements } from '../CloneElements';
import { OrchestratedElement, SavingFailure } from '../Orchestrator';
import { useSaving } from './useSaving';

export const SAVING_STRATEGY = process.env.SAVING_STRATEGY || 'partial'; // or complete

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { goNextPage, criticality, currentChange, getData } = rest;

	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ strategy: SAVING_STRATEGY, currentChange, getData });

	const handleNextPage = useCallback(
		function () {
			(async function () {
				if (!criticality) {
					try {
						setSavingFailure(undefined);
						const somethingToSave = await save();
						if (somethingToSave) {
							setSavingFailure({ status: 200 });
						}
						if (goNextPage) {
							goNextPage();
						}
					} catch (e) {
						setSavingFailure({ status: 500 });
					}
				}
			})();
		},
		[goNextPage, criticality, save]
	);

	return (
		<CloneElements<OrchestratedElement>
			{...rest}
			goNextPage={handleNextPage}
			savingFailure={savingFailure}
		>
			{children}
		</CloneElements>
	);
}
