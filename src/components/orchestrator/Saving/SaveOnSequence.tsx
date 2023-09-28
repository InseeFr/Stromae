import { PropsWithChildren, useState, useCallback } from 'react';
import { CloneElements } from '../CloneElements';
import { isComponentsContainSequence } from '../../../lib/commons/isComponentscontainSequence';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { useSaving } from './useSaving';

/**
 * Sauvegarde lors des changement de séquences.
 *
 * @param props
 * @returns
 */
export function SaveOnSequence(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		currentChange,
		getData,
		getComponents = () => [],
		goNextPage,
		isLastPage,
	} = rest;
	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData });

	const components = getComponents();
	const isSequence = isComponentsContainSequence(components);

	const handleGoNext = useCallback(async () => {
		if (isSequence) {
			try {
				setSavingFailure(undefined);
				const somethingToSave = await save(isLastPage ?? false);
				if (somethingToSave) {
					setSavingFailure({ status: 200 });
				}
				goNextPage?.();
			} catch (e) {
				setSavingFailure({ status: 500 });
			}
		}
	}, [goNextPage, isSequence, save, isLastPage]);

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
