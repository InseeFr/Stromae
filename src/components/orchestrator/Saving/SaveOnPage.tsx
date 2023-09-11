import { useCallback, useState, PropsWithChildren, useRef } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';
import { usePrevious } from '../../../lib/commons/usePrevious';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		goNextPage,
		goPreviousPage,
		currentChange,
		currentPage,
		getData,
		isLastPage,
		collectStatus,
	} = rest;

	const previousPage = usePrevious(currentPage);
	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({
		currentChange,
		getData,
		currentPage,
		isLastPage,
		collectStatus,
	});
	const [waiting, setWaiting] = useState(false);
	const shouldSync = useRef(false);

	useAsyncEffect(async () => {
		if (
			currentPage &&
			previousPage &&
			shouldSync.current &&
			previousPage !== currentPage
		) {
			shouldSync.current = false;
			try {
				setSavingFailure(undefined);
				setWaiting(true);
				const somethingToSave = await save();
				setWaiting(false);
				if (somethingToSave) {
					setSavingFailure({ status: 200 });
				}
			} catch (e) {
				setSavingFailure({ status: 500 });
			}
		}
	}, [shouldSync, currentPage, previousPage, save]);

	const handleNextPage = useCallback(async () => {
		if (currentPage) {
			goNextPage?.();
			shouldSync.current = true;
		}
	}, [goNextPage, currentPage, shouldSync]);

	const handleGoBack = useCallback(async () => {
		goPreviousPage?.();
		shouldSync.current = true;
	}, [goPreviousPage, shouldSync]);

	return (
		<CloneElements<OrchestratedElement>
			{...rest}
			goNextPage={handleNextPage}
			goPreviousPage={handleGoBack}
			savingFailure={savingFailure}
			waiting={waiting}
		>
			{children}
		</CloneElements>
	);
}
