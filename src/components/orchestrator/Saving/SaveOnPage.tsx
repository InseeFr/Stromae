import { useCallback, useState, PropsWithChildren, useRef } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';
import { usePrevious } from '../../../lib/commons/usePrevious';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const {
		goNextPage,
		goPreviousPage,
		currentChange,
		getData,
		isLastPage,
		initialCollectStatus,
		pageTag,
		children,
	} = props;

	const previousPageTag = usePrevious(pageTag);
	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({
		currentChange,
		getData,
		pageTag,
		initialCollectStatus,
	});
	const [waiting, setWaiting] = useState(false);
	const shouldSync = useRef(false);

	const isNewPage =
		pageTag !== undefined &&
		previousPageTag !== undefined &&
		previousPageTag !== pageTag;

	const makeSave = useCallback(
		async (isLastPage: boolean) => {
			try {
				setSavingFailure(undefined);
				setWaiting(true);
				const somethingToSave = await save(isLastPage);
				setWaiting(false);
				if (somethingToSave) {
					setSavingFailure({ status: 200 });
				}
			} catch (e) {
				setSavingFailure({ status: 500 });
				setWaiting(false);
			}
		},
		[save]
	);

	/**
	 * On déclenche la sauvegarde : quand lunatic à fini de tourner la page et quand l'utilisateur à cliquer
	 * sur le bouton suivant/precedent
	 */
	useAsyncEffect(async () => {
		if (isNewPage && shouldSync.current) {
			shouldSync.current = false;
			makeSave(false);
		}
	}, [isNewPage]);

	const handleNextPage = useCallback(async () => {
		if (isLastPage) {
			await makeSave(true);
		} else if (pageTag) {
			shouldSync.current = true;
		}
		goNextPage?.();
	}, [goNextPage, pageTag, shouldSync, isLastPage, makeSave]);

	const handleGoBack = useCallback(async () => {
		goPreviousPage?.();
		shouldSync.current = true;
	}, [goPreviousPage, shouldSync]);

	return (
		<CloneElements<OrchestratedElement>
			{...props}
			goNextPage={handleNextPage}
			goPreviousPage={handleGoBack}
			savingFailure={savingFailure}
			waiting={waiting}
		>
			{children}
		</CloneElements>
	);
}
