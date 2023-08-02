import { useCallback, useState, PropsWithChildren } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		goNextPage,
		goPreviousPage,
		currentChange,
		getData,
		pageTag,
		isLastPage,
	} = rest;

	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData, pageTag, isLastPage });
	const [waiting, setWaiting] = useState(false);

	const handleSave = useCallback(
		async (postSave?: () => void) => {
			try {
				setSavingFailure(undefined);
				setWaiting(true);
				const somethingToSave = await save();
				setWaiting(false);
				if (somethingToSave) {
					setSavingFailure({ status: 200 });
				}
				postSave?.();
			} catch (e) {
				setSavingFailure({ status: 500 });
			}
		},
		[save]
	);

	const handleNextPage = useCallback(async () => {
		handleSave(goNextPage);
	}, [goNextPage, handleSave]);

	const handleGoBack = useCallback(async () => {
		handleSave(goPreviousPage);
	}, [goPreviousPage, handleSave]);

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
