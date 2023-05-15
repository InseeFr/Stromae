import { useCallback, useState, PropsWithChildren } from 'react';
import { OrchestratedElement, SavingFailure } from '../../../typeStromae/type';
import { CloneElements } from '../CloneElements';
import { useSaving } from './useSaving';

export function SaveOnPage(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		goNextPage = () => null,
		currentChange,
		getData,
		pageTag,
		isLastPage,
	} = rest;

	const [savingFailure, setSavingFailure] = useState<SavingFailure>();
	const save = useSaving({ currentChange, getData, pageTag, isLastPage });

	const handleNextPage = useCallback(async () => {
		try {
			setSavingFailure(undefined);
			const somethingToSave = await save();

			if (somethingToSave) {
				setSavingFailure({ status: 200 });
			}
			goNextPage();
		} catch (e) {
      // 
			setSavingFailure({ status: 500 });
		}
	}, [goNextPage, save]);

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
