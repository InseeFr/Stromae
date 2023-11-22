import { useContext } from 'react';
import { loadSourceDataContext } from '../components/loadSourceData/LoadSourceDataContext';
import { CollectStatusEnum } from '../typeStromae/type';

export function useSaveSurveyUnitStateData() {
	const { putSurveyUnitStateData } = useContext(loadSourceDataContext);
	return async function save(args: {
		collectStatus?: CollectStatusEnum;
		pageTag?: string;
	}) {
		const state = {
			state: args.collectStatus ?? CollectStatusEnum.Completed,
			date: new Date().getTime(),
			currentPage: args.pageTag ?? '1',
		};
		try {
<<<<<<< HEAD
			debugger;
=======
>>>>>>> ef8292d (save a last time suData when click continue on last page, outof orchestrator)
			await putSurveyUnitStateData(state);
			return state;
		} catch (e) {
			throw new Error(
				'Une erreur est survenue lors de la sauvegarde de SUdata'
			);
		}
	};
}
