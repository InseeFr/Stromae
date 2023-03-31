import { useRef, useEffect, useContext } from 'react';
import { loadSourceDataContext } from '../../loadSourceData/LoadSourceDataContext';
import { VariablesType } from '../../../typeStromae/type';

export const SAVING_STRATEGY = process.env.REACT_APP_SAVING_STRATEGY;

export function useSaving(args: {
	currentChange?: { name: string };
	getData?: (refreshCalculated: boolean) => VariablesType;
}) {
	const { currentChange, getData } = args;
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
							return { ...map, [name]: variables[name] };
						}
						return map;
					}, {});
				}
			} else if (SAVING_STRATEGY === 'complete') {
				data = getData(true); // false is better
			}

			if (data && Object.keys(data).length) {
				// TODO something  to save!
				const state = { state: 'INIT', date: 0, currentPage: '1' };
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
