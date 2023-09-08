import {
	useCallback,
	useState,
	PropsWithChildren,
	useEffect,
	useRef,
} from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';
import { usePrevious } from '../../../lib/commons/usePrevious';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		goNextPage,
		goPreviousPage,
		currentChange,
		currentPage,
		getData,

		isLastPage,
	} = rest;
	const previousPage = usePrevious(currentPage);

	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData, currentPage, isLastPage });
	const [waiting, setWaiting] = useState(false);
	const onSave = useRef(false);

	useEffect(() => {
		/* 
			On sauvegarde quand lunatic vient de changer  
			la page et quand l'utilisateur à cliqué un
			bouton de navigation
		*/
		if (
			currentPage &&
			previousPage &&
			onSave.current &&
			previousPage !== currentPage
		) {
			onSave.current = false;
			(async () => {
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
			})();
		}
	}, [onSave, currentPage, previousPage, save]);

	const handleNextPage = useCallback(async () => {
		if (currentPage) {
			goNextPage?.();
			onSave.current = true;
		}
	}, [goNextPage, currentPage]);

	const handleGoBack = useCallback(async () => {
		goPreviousPage?.();
		onSave.current = true;
	}, [goPreviousPage]);

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
