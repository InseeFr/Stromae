import { useCallback, useContext, useRef, useState } from 'react';
import { CollectStatusEnum, SavingFailure } from '../../../typeStromae/type';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';

function getCollectStatus(
	changing: boolean,
	lastPageReach: boolean,
	previous: CollectStatusEnum
) {
	if (previous === CollectStatusEnum.Validated || lastPageReach) {
		return CollectStatusEnum.Validated;
	}
	if (changing) {
		return CollectStatusEnum.Completed;
	}

	return previous;
}

type useSavingArgs = {
	setWaiting: (w: boolean) => void;
	setFailure: (s?: SavingFailure) => void;
	initialCollectStatus: CollectStatusEnum;
};

export function useSaving({
	setWaiting,
	setFailure,
	initialCollectStatus,
}: useSavingArgs) {
	const [currentStatus, setCurrentStatus] = useState(initialCollectStatus);
	const changes = useRef<Map<string, unknown>>(new Map());
	const { putSurveyUnitData, putSurveyUnitStateData } = useContext(
		loadSourceDataContext
	);

	const listenChange = useCallback((componentName: string, value: unknown) => {
		changes.current.set(componentName, value);
	}, []);

	const saveChange = useCallback(
		async ({
			isLastPage,
			pageTag,
			getData,
		}: {
			isLastPage: boolean;
			pageTag: string;
			getData: () => any;
		}) => {
			setFailure(undefined);
			setWaiting(true);
			try {
				// save data
				const isOnChange = changes.current.size !== 0;
				if (isOnChange) {
					const lunaticValues = getData().COLLECTED ?? {};
						const payload = Object.entries(
							Object.fromEntries(changes.current)
						).reduce((acc, [name]) => {
							return { ...acc, [name]: lunaticValues[name]?.COLLECTED ?? null };
						}, {});
						await putSurveyUnitData(payload);
						setFailure({ status: 200 });
						changes.current.clear();
					}
				// save stateData
				const state = {
					state: getCollectStatus(isOnChange, isLastPage, currentStatus),
					date: new Date().getTime(),
					currentPage: pageTag ?? '1',
				};
				setCurrentStatus(state.state);
				await putSurveyUnitStateData(state);
				setWaiting(false);
			} catch (e) {
				setFailure({ status: 500 });
				setWaiting(false);
			}
		},
		[
			currentStatus,
			putSurveyUnitData,
			putSurveyUnitStateData,
			setFailure,
			setWaiting,
		]
	);

	return { listenChange, saveChange };
}
