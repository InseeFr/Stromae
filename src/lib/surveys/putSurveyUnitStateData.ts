import { StateData } from '../../typeStromae/type';
import { authenticatedPutRequest } from '../commons/axios-utils';
import { surveyUnitStateDataUrl } from './api';

export const putSurveyUnitStateData =
	(domain: string) =>
	async (state: StateData, unit: string, token: string | undefined) => {
		try {
			await authenticatedPutRequest<StateData>(
				surveyUnitStateDataUrl(domain, unit),
				state,
				token
			);
		} catch (e) {
			throw new Error('Impossible de sauvegarder SuData');
		}
	};
