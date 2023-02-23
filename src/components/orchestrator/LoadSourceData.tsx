import {
	PropsWithChildren,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react';
import { LunaticSource } from '../../typeLunatic/type-source';
import { SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import Orchestrator from './Orchestrator';

type LoadSourceDataProps = {
	onChange?: (args: any) => void;
};
//
function LoadSourceData({
	children,
	onChange,
}: PropsWithChildren<LoadSourceDataProps>) {
	const alreadyDone = useRef(false);
	const { getSurvey, getSurveyUnitData } = useContext(loadSourceDataContext);
	const [source, setSource] = useState<LunaticSource | undefined>(undefined);
	const [surveyUnitData, setSurveyUnitData] = useState<
		SurveyUnitData | undefined
	>(undefined);

	useEffect(
		function () {
			if (!alreadyDone.current) {
				(async function () {
					if (getSurvey && getSurveyUnitData) {
						alreadyDone.current = true;
						const [pSource, pData] = await Promise.all([
							await getSurvey(),
							await getSurveyUnitData(),
						]);
						setSource(pSource);
						setSurveyUnitData(pData);
					}
				})();
			}
		},
		[alreadyDone, getSurvey, getSurveyUnitData]
	);
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
