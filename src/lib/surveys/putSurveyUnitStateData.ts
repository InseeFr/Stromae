import { StateData } from '../../typeStromae/type';
import { putRequest } from '../commons/axios-utils';

import { surveyUnitStateDataUrl } from './api';

export const putSurveyUnitStateData =
	(domain: string) => async (state: StateData, unit: string) => {
		await putRequest<StateData>(surveyUnitStateDataUrl(domain, unit), state);
	};
