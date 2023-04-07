import { useRef, useEffect, useContext } from 'react';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';
import { OrchestratedElement } from '../../../typeStromae/type';

const SAVING_STRATEGY = process.env.REACT_APP_SAVING_STRATEGY;

type SavingArgs = Pick<
	OrchestratedElement,
	'currentChange' | 'getData' | 'pageTag'
>;

export function useSaving(args: SavingArgs) {
	const { currentChange, getData, pageTag } = args;
	const changes = useRef<Record<string, null>>({});
	const { putSurveyUnitData } = useContext(loadSourceDataContext);

	useEffect(
		function () {
			if (currentChange) {
				const { name } = currentChange;
				changes.current[name] = null;
			}
		},
		[currentChange]
	);

	return async function save() {
		let data;
		if (getData) {
			if (SAVING_STRATEGY === 'partial') {
				const keys = Object.keys(changes.current);
				if (keys.length) {
					const vFromL = getData(false);
					const variables = Object.assign(vFromL.COLLECTED, vFromL.CALCULATED);

					data = keys.reduce(function (map, name) {
						if (name in variables) {
							return { ...map, [name]: variables[name].COLLECTED };
						}
						return map;
					}, {});
				}
			} else if (SAVING_STRATEGY === 'complete') {
				data = getData(true); // false is better
			}

			if (data && Object.keys(data).length) {
				// TODO remplir state correctement
				const state = {
					state: 'INIT',
					date: new Date().getTime(),
					currentPage: pageTag ?? '1',
				};
				const status = await putSurveyUnitData({ data, state });
				if (status) {
					changes.current = {}; // seulement si la sauvegarde is good || !complete
					return true;
				} else {
					throw new Error('Une erreur est survenue lors de la sauvegarde');
				}
			}
			return false;
		}
	};
}
