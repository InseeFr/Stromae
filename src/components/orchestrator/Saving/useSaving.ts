import { useRef, useEffect, useContext } from 'react';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';
import {
	OrchestratedElement,
	CollectStatusEnum,
} from '../../../typeStromae/type';

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
		return CollectStatusEnum.Validated;
	}
	if (changing) {
		return CollectStatusEnum.Completed;
	}

	return previous;
}

export function useSaving(args: SavingArgs) {
	const { currentChange, getData, pageTag, isLastPage, collectStatus } = args;
	const changes = useRef<Record<string, null>>({});
	const { putSurveyUnitData, putSurveyUnitStateData } = useContext(
		loadSourceDataContext
	);

	useEffect(() => {
		if (!currentChange) {
			return;
		}
		const { name } = currentChange;
		changes.current[name] = null;
	}, [currentChange]);

	return async function save() {
		let data = {};
		if (!getData || collectStatus === CollectStatusEnum.Validated) {
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
			const status = await putSurveyUnitData(data);
			if (status) {
				// seulement si la sauvegarde is good || !complete
				// eslint-disable-next-line require-atomic-updates
				changes.current = {};
			} else {
				throw new Error('Une erreur est survenue lors de la sauvegarde');
			}
		}
		// On sauvegarde le parcourt de l'utilisateur
		const state = {
			state: getCollectStatus(changing, isLastPage ?? false, collectStatus),
			date: new Date().getTime(),
			currentPage: pageTag ?? '1',
		};
		const status = await putSurveyUnitStateData(state);
		if (status) {
			return true;
		} else {
			throw new Error('Une erreur est survenue lors de la sauvegarde');
		}
	};
}
