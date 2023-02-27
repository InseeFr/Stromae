import { PropsWithChildren, useContext } from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
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

	const requiredNomenclatures = useRemote<Array<string>>(
		getRequiredNomenclatures
	);
	const source = useRemote<LunaticSource>(getSurvey);
	const surveyUnitData = useRemote<SurveyUnitData>(getSurveyUnitData);

	if (source && surveyUnitData) {
		return (
			<Orchestrator
				source={source}
				surveyUnitData={surveyUnitData}
				onChange={onChange}
			>
				{children}
			</Orchestrator>
		);
	}
	return null;
}

export default LoadSourceData;
