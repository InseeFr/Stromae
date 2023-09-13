import { PropsWithChildren, useState, useCallback } from 'react';
import { CloneElements } from '../CloneElements';
import { isComponentsContainSequence } from '../../../lib/commons/isComponentscontainSequence';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { useSaving } from './useSaving';

export function SaveOnSequence(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { currentChange, getData, getComponents = () => [], goNextPage } = rest;
	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData });

	const components = getComponents();
	const isSequence = isComponentsContainSequence(components);

	const handleGoNext = useCallback(() => {
		if (goNextPage) {
			if (isSequence) {
				(async function () {
					try {
						setSavingFailure(undefined);
						const somethingToSave = await save();

						if (somethingToSave) {
							setSavingFailure({ status: 200 });
						}
						goNextPage();
					} catch (e) {
						setSavingFailure({ status: 500 });
					}
				})();
			}
		}
	}, [goNextPage, isSequence, save]);

	return (
		<CloneElements<OrchestratedElement>
			{...rest}
			goNextPage={handleGoNext}
			savingFailure={savingFailure}
		>
			{children}
		</CloneElements>
	);
}
