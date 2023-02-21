import { useEffect, useState, useRef, PropsWithChildren } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import type { SurveyUnitData } from '../../typeStromae/type';
import { publicRequest, HTTP_VERBS } from '../../lib/commons/axios-utils';
import Orchestrator from '../../components/orchestrator/Orchestrator';

type LoadSourceDataProps = {
	hrefSource?: string;
	hrefData?: string;
	onChange: (...ars: any) => void;
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

function LocalLoadSourceData(props: PropsWithChildren<LoadSourceDataProps>) {
	const { hrefSource, hrefData, children, onChange } = props;
	const alreadyDone = useRef(false);
	const [source, setSource] = useState<LunaticSource | undefined>(undefined);
	const [data, setData] = useState<SurveyUnitData | undefined>(undefined);

	useEffect(
		function () {
			if (hrefData && hrefSource && !alreadyDone.current) {
				alreadyDone.current = true;
				(async function () {
					const [s, d] = await LoadSourceData(hrefSource, hrefData);
					setSource(s);
					setData(d);
				})();
			}
		},
		[hrefData, hrefSource]
	);

	if (source && data) {
		return (
			<Orchestrator source={source} data={data} onChange={onChange}>
				{children}
			</Orchestrator>
		);
	}
	return <>Skeleton please</>;
}

export default LocalLoadSourceData;
