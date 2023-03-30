import { useCallback, useState } from 'react';
import { PropsWithChildren } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
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
						console.error(e);
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
