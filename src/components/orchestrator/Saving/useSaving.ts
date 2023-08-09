import { useRef, useEffect, useContext } from 'react';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';
import { OrchestratedElement } from '../../../typeStromae/type';

const SAVING_STRATEGY = process.env.REACT_APP_SAVING_STRATEGY;

type SavingArgs = Pick<
	OrchestratedElement,
	'currentChange' | 'getData' | 'pageTag' | 'isLastPage' | 'collectStatus'
>;

function isOnChange(data: {} = {}) {
	return Object.keys(data).length > 0;
}

function getCollectStatus(
	changing: boolean,
	isLastPage: boolean,
	previous?: string | null
) {
	if (isLastPage) {
		return 'VALIDATED';
	}
	if (changing) {
		return 'COLLECTED';
	}

	return previous;
}

export function useSaving(args: SavingArgs) {
	const { currentChange, getData, pageTag, isLastPage, collectStatus } = args;
	const changes = useRef<Record<string, null>>({});
	const { putSurveyUnitData } = useContext(loadSourceDataContext);

	useEffect(() => {
		if (!currentChange) {
			return;
		}
		const { name } = currentChange;
		changes.current[name] = null;
	}, [currentChange]);

	return async function save() {
		let data = {};
		if (!getData) {
			return undefined;
		}
		if (SAVING_STRATEGY === 'partial') {
			const keys = Object.keys(changes.current);
			if (keys.length) {
				const vFromL = getData(false);
				const variables = Object.assign(vFromL.COLLECTED, vFromL.CALCULATED);

				data = keys.reduce((map, name) => {
					if (name in variables) {
						return { ...map, [name]: variables[name].COLLECTED };
					}
					return map;
				}, {});
			}
		} else if (SAVING_STRATEGY === 'complete') {
			// false is better
			data = getData(true);
		}
		const changing = isOnChange(data);
		if (changing || isLastPage) {
			const state = {
				state: getCollectStatus(changing, isLastPage ?? false, collectStatus),
				date: new Date().getTime(),
				currentPage: pageTag ?? '1',
			};
			const status = await putSurveyUnitData({ data, state });
			if (status) {
				// seulement si la sauvegarde is good || !complete
				// eslint-disable-next-line require-atomic-updates
				changes.current = {};
				return true;
			} else {
				throw new Error('Une erreur est survenue lors de la sauvegarde');
			}
		}
		return false;
	};
}
