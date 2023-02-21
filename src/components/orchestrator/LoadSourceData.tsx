import { useEffect, useState, useRef, PropsWithChildren } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import type { SurveyUnitData } from '../../typeStromae/type';
import { useOidcAccessToken } from '../../lib/oidc';
import surveyApi from '../../lib/surveys/surveysApi';
import Orchestrator from './Orchestrator';

type LoadSourceDataProps = {
	survey?: string;
	unit?: string;
	onChange: (...ars: any) => void;
};

function LoadSourceData(props: PropsWithChildren<LoadSourceDataProps>) {
	const { survey, unit, children, onChange } = props;
	const alreadyDone = useRef(false);
	const [source, setSource] = useState<LunaticSource | undefined>(undefined);
	const [surveyUnitData, setSurveyUnitData] = useState<
		SurveyUnitData | undefined
	>(undefined);
	const { accessToken } = useOidcAccessToken();

	useEffect(
		function () {
			if (!alreadyDone.current) {
				(async function () {
					if (survey && unit && accessToken) {
						alreadyDone.current = true;
						const [pSource, pData] = await Promise.all([
							surveyApi.getSurvey(survey, accessToken),
							surveyApi.getSurveyUnitData(unit, accessToken),
						]);
						setSource(pSource);
						setSurveyUnitData(pData);
					}
				})();
			}
		},
		[survey, accessToken, alreadyDone, unit]
	);

	if (source && surveyUnitData) {
		return (
			<Orchestrator source={source} data={surveyUnitData} onChange={onChange}>
				{children}
			</Orchestrator>
		);
	}
	return <>Skeleton please</>;
}

export default LoadSourceData;
