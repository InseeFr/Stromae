import { useEffect, useState, useRef, ReactElement, cloneElement } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import type { SurveyUnitData } from '../../typeStromae/type';
import { useOidcAccessToken } from '../../lib/oidc';
import surveyApi from '../../lib/surveys/surveysApi';
import { OrchestratorProps } from '../orchestrator/Orchestrator';

type LoadFromApiProps = {
	survey?: string;
	unit?: string;
	children?: ReactElement<OrchestratorProps>;
};

function LoadFromApi(props: LoadFromApiProps) {
	const { survey, unit, children } = props;
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

	if (source && surveyUnitData && children) {
		return cloneElement(children, {
			source,
			data: surveyUnitData,
		});
	}
	return <>Skeleton please</>;
}

export default LoadFromApi;
