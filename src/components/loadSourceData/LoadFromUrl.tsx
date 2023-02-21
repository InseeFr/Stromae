import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { publicRequest, HTTP_VERBS } from '../../lib/commons/axios-utils';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { MetadataSurvey } from '../../lib/surveys/getMetadataSurvey';
import { LunaticData } from '../../typeLunatic/type';

type LoadFromUrlProps = {
	urlSource?: string;
	urlData?: string;
	urlMetadata?: string;
};

function LoadFromUrl({
	children,
	urlSource,
	urlMetadata,
	urlData,
}: PropsWithChildren<LoadFromUrlProps>) {
	const getMetadata = useCallback(
		async function () {
			if (urlMetadata) {
				return await publicRequest<MetadataSurvey>(HTTP_VERBS.get, urlMetadata);
			}
		},
		[urlMetadata]
	);
	const getSurvey = useCallback(
		async function () {
			if (urlSource) {
				return await publicRequest<LunaticSource>(HTTP_VERBS.get, urlSource);
			}
		},
		[urlSource]
	);
	const getSurveyUnitData = useCallback(
		async function () {
			if (urlData) {
				const data = await publicRequest<LunaticData>(HTTP_VERBS.get, urlData);
				return { data };
			}
		},
		[urlData]
	);

	return (
		<loadSourceDataContext.Provider
			value={{ getMetadata, getSurvey, getSurveyUnitData }}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}

export default LoadFromUrl;
