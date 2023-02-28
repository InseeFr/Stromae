import { PropsWithChildren, useContext } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import IndexSuggesters from './IndexSuggesters';
import Orchestrator from './Orchestrator';
import useRemote from './useRemote';

type LoadSourceDataProps = {
	onChange?: (args: any) => void;
};
//
function LoadSourceData({
	children,
	onChange,
}: PropsWithChildren<LoadSourceDataProps>) {
	const { getSurvey, getSurveyUnitData, getRequiredNomenclatures } = useContext(
		loadSourceDataContext
	);

	const requiredNomenclatures = useRemote<Record<string, Array<unknown>>>(
		getRequiredNomenclatures
	);
	const source = useRemote<LunaticSource>(getSurvey);
	const surveyUnitData = useRemote<SurveyUnitData>(getSurveyUnitData);
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

export default LoadSourceData;
