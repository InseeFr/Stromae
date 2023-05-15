import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router';

import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';

import { CloneElements } from './CloneElements';
import { OrchestratorProps } from './Orchestrator';
import { useRemote } from './useRemote';

type LoadSourceDataProps = {
	onChange?: (args: any) => void;
};

//
export function LoadSourceData({
	children,
	onChange,
}: PropsWithChildren<LoadSourceDataProps>) {
	const navigate = useNavigate();
	const { getSurvey, getSurveyUnitData, getReferentiel } = useContext(
		loadSourceDataContext
	);

	function navigateError() {
		navigate('/404');
	}

	const source = useRemote<LunaticSource>(getSurvey, navigateError);
	const surveyUnitData = useRemote<SurveyUnitData>(
		getSurveyUnitData,
		navigateError
	);

	if (!source || !surveyUnitData) {
		// TODO skeleton
		return null;
	}

	return (
		<CloneElements<OrchestratorProps>
			source={source}
			surveyUnitData={surveyUnitData}
			getReferentiel={getReferentiel}
			onChange={onChange}
		>
			{children}
		</CloneElements>
	);
}
