import { useEffect, useState, useRef, ReactElement, cloneElement } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import type { SurveyUnitData } from '../../typeStromae/type';
import { publicRequest, HTTP_VERBS } from '../../lib/commons/axios-utils';
import { OrchestratorProps } from '../orchestrator/Orchestrator';

type LoadFromUrlProps = {
	urlSource?: string;
	urlData?: string;
	children?: ReactElement<OrchestratorProps>;
};

async function LoadSourceData(
	hrefSource: string,
	hrefData: string
): Promise<[LunaticSource, SurveyUnitData]> {
	return Promise.all([
		publicRequest(HTTP_VERBS.get, hrefSource),
		publicRequest(HTTP_VERBS.get, hrefData),
	]).then(function ([a, b]) {
		return [a as LunaticSource, { data: b } as SurveyUnitData];
	});
}

function LoadFromUrl(props: LoadFromUrlProps) {
	const { urlSource, urlData, children } = props;
	const alreadyDone = useRef(false);
	const [source, setSource] = useState<LunaticSource | undefined>(undefined);
	const [data, setData] = useState<SurveyUnitData | undefined>(undefined);

	useEffect(
		function () {
			if (urlSource && urlData && !alreadyDone.current) {
				alreadyDone.current = true;
				(async function () {
					const [s, d] = await LoadSourceData(urlSource, urlData);
					setSource(s);
					setData(d);
				})();
			}
		},
		[urlData, urlSource]
	);

	if (source && data && children) {
		return cloneElement(children, { source, data });
	}
	return <>Skeleton please</>;
}

export default LoadFromUrl;
