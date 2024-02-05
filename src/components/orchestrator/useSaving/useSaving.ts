import { useCallback, useContext, useRef, useState } from 'react';
import { CollectStatusEnum, SavingFailure } from '../../../typeStromae/type';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';
import { useSaveSurveyUnitStateData } from '../../../hooks/useSaveSurveyUnitData';

function getCollectStatus(changing: boolean, previous: CollectStatusEnum) {
	if (previous === CollectStatusEnum.Validated) {
		return CollectStatusEnum.Validated;
	}
	if (changing) {
		return CollectStatusEnum.Completed;
	}

	return previous;
}

type useSavingArgs = {
	setFailure: (s?: SavingFailure) => void;
	initialCollectStatus: CollectStatusEnum;
};

export function useSaving({ setFailure, initialCollectStatus }: useSavingArgs) {
	const [currentStatus, setCurrentStatus] = useState(initialCollectStatus);
	const changes = useRef<Map<string, unknown>>(new Map());
	const saveSuData = useSaveSurveyUnitStateData();
	const { putSurveyUnitData } = useContext(loadSourceDataContext);
	const listenChange = useCallback((componentName: string, value: unknown) => {
		changes.current.set(componentName, value);
	}, []);

	const saveChange = useCallback(
		async ({ pageTag, getData }: { pageTag: string; getData: () => any }) => {
			setFailure(undefined);
			// setWaiting(true);

			try {
				// save data
				const isOnChange = changes.current.size !== 0;
				if (isOnChange) {
					const lunaticValues = getData()?.COLLECTED ?? {};
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
				const state = await saveSuData({
					pageTag,
					collectStatus: getCollectStatus(isOnChange, currentStatus),
				});
				setCurrentStatus(state.state);
				return true;
			} catch (e) {
				setFailure({ status: 500 });
				return false;
			}
		},
		[currentStatus, putSurveyUnitData, setFailure, saveSuData]
	);

	return { listenChange, saveChange };
}
