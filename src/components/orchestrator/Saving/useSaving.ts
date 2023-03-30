import { useRef, useEffect } from 'react';
import { VariablesType } from '../../../typeStromae/type';

export function useSaving(args: {
	strategy: string;
	currentChange?: { name: string };
	getData?: (refreshCalculated: boolean) => VariablesType;
}) {
	const { strategy, currentChange, getData } = args;
	const changes = useRef<Record<string, null>>({});

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
		let toSave;
		if (getData) {
			if (strategy === 'partial') {
				const keys = Object.keys(changes.current);
				if (keys.length) {
					const vFromL = getData(false);
					const variables = Object.assign(vFromL.COLLECTED, vFromL.CALCULATED);
					toSave = keys.reduce(function (map, name) {
						if (name in variables) {
							return { ...map, [name]: variables[name] };
						}
						return map;
					}, {});
				}
			} else if (strategy === 'complete') {
				toSave = getData(true);
			}

			if (toSave && Object.keys(toSave).length) {
				// TODO something  to save!
				console.warn('totSave : call the API please', toSave);
				changes.current = {}; // seulement si la sauvegarde is good || !complete
				return true;
			}
			return false;
		}
	};
}
