import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { IndexSuggesters } from './IndexSuggesters';
import { Orchestrator } from './Orchestrator';
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
	const { getSurvey, getSurveyUnitData, getRequiredNomenclatures } = useContext(
		loadSourceDataContext
	);

	function navigateError() {
		navigate('/');
	}

	const requiredNomenclatures = useRemote<Record<string, Array<unknown>>>(
		getRequiredNomenclatures
	);
	const source = useRemote<LunaticSource>(getSurvey, navigateError);
	const surveyUnitData = useRemote<SurveyUnitData>(
		getSurveyUnitData,
		navigateError
	);
	const suggesters = source?.suggesters;

	if (source && surveyUnitData) {
		return (
			<IndexSuggesters
				requiredNomenclatures={requiredNomenclatures}
				suggesters={suggesters}
			>
				<Orchestrator
					source={source}
					surveyUnitData={surveyUnitData}
					onChange={onChange}
				>
					{children}
				</Orchestrator>
			</IndexSuggesters>
		);
	}
	return null;
}
