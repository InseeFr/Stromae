import { PropsWithChildren, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

import { LunaticSource } from '../../typeLunatic/type-source';
import { MetadataSurvey, SurveyUnitData } from '../../typeStromae/type';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';

import { CloneElements } from './CloneElements';
import { OrchestratorProps } from './Orchestrator';
import { useRemote } from './useRemote';
import { uri301, uri404 } from '../../lib/domainUri';

type LoadSourceDataProps = {
	onChange?: (args: any) => void;
};

export type responseData = {
	status: number;
	message: string;
};

export function LoadSourceData({
	children,
	onChange,
}: PropsWithChildren<LoadSourceDataProps>) {
	const { survey } = useParams();
	const navigate = useNavigate();
	const { getSurvey, getSurveyUnitData, getReferentiel, getMetadata } =
		useContext(loadSourceDataContext);

	function navigateError(data?: responseData) {
		if (data?.status) {
			if (data.status === 301) {
				navigate(uri301(survey, data.message));
			} else {
				navigate(uri404());
			}
		}
	}

	const metadata = useRemote<MetadataSurvey>(getMetadata, navigateError);
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
			metadata={metadata}
		>
			{children}
		</CloneElements>
	);
}
