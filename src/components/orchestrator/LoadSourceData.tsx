import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { Orchestrator } from './Orchestrator';
import { useRemote } from './useRemote';

type LoadSourceDataProps = {
	onChange?: (args: any) => void;
	activeControls?: boolean;
};
//
export function LoadSourceData({
	children,
	onChange,
	activeControls,
}: PropsWithChildren<LoadSourceDataProps>) {
	const navigate = useNavigate();
	const { getSurvey, getSurveyUnitData, getReferentiel } = useContext(
		loadSourceDataContext
	);

	function navigateError() {
		navigate('/');
	}

	const source = useRemote<LunaticSource>(getSurvey, navigateError);
	const surveyUnitData = useRemote<SurveyUnitData>(
		getSurveyUnitData,
		navigateError
	);

	if (source && surveyUnitData) {
		return (
			<Orchestrator
				source={source}
				surveyUnitData={surveyUnitData}
				getReferentiel={getReferentiel}
				onChange={onChange}
				activeControls={activeControls}
			>
				{children}
			</Orchestrator>
		);
	}
	return null;
}
