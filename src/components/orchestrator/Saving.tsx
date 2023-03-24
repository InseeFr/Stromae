import { PropsWithChildren, useRef, useEffect, useCallback } from 'react';
import { CloneElements } from './CloneElements';
import { OrchestratedElement } from './Orchestrator';
import { createSavingStrategy } from './utils/savingStrategy';
import { createTimeToSave } from './utils/savingTime';

export const SAVING_STRATEGY = process.env.SAVING_STRATEGY || 'partial'; // or complete
export const SAVING_TIME = process.env.REACT_APP_SAVING_TIME || 'page'; // or sequence

const timeToSave = createTimeToSave(SAVING_STRATEGY);
const save = createSavingStrategy(SAVING_STRATEGY);

export function Saving(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const {
		getData,
		getComponents,
		currentChange,
		criticality,
		goNextPage = () => null,
	} = props; // save complete/save on sequence

	const changes = useRef<Record<string, null>>({});

	function clean() {
		changes.current = {};
	}

	useEffect(
		function () {
			if (currentChange) {
				const { name } = currentChange;
				changes.current[name] = null;
			}
		},
		[currentChange]
	);

	const handleNextPage = useCallback(
		function () {
			(async function () {
				if (timeToSave({ criticality, getComponents })) {
					const status = await save({
						getData,
						changes: changes.current,
						clean,
					});
					if (status) {
						goNextPage();
					} else {
						console.error('Erreur lors de la sauvegarde !');
						// TODO prévenir l'utilisateur
					}
				} else {
					goNextPage();
				}
			})();
		},
		[goNextPage, criticality, getComponents, getData]
	);

	return (
		<CloneElements<OrchestratedElement> {...rest} goNextPage={handleNextPage}>
			{children}
		</CloneElements>
	);
}
