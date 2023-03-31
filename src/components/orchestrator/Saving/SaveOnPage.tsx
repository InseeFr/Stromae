import { useCallback, useState } from 'react';
import { PropsWithChildren } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { goNextPage = () => null, criticality, currentChange, getData } = rest;

	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData });

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
						goNextPage();
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
