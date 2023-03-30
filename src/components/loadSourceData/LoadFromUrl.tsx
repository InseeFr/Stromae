import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { publicRequest, HTTP_VERBS } from '../../lib/commons/axios-utils';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { MetadataSurvey } from '../../lib/surveys/getMetadataSurvey';
import { SurveyUnitData } from '../../typeStromae/type';

type LoadFromUrlProps = {
	urlSource?: string;
	urlData?: string;
	urlMetadata?: string;
	urlRequiredNomenclatures?: string;
	urlNomenclatures?: Record<string, string>;
};

const empty = {};

export function LoadFromUrl({
	children,
	urlSource,
	urlMetadata,
	urlData,
	urlNomenclatures = empty,
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
				return await publicRequest<SurveyUnitData>(HTTP_VERBS.get, urlData);
			}
		},
		[urlData]
	);

	const getReferentiel = useCallback(
		async function (name: string): Promise<Array<unknown>> {
			if (name in urlNomenclatures) {
				const url = urlNomenclatures[name];
				return await publicRequest<Array<unknown>>(HTTP_VERBS.get, url);
			}

			return [];
		},
		[urlNomenclatures]
	);

	return (
		<loadSourceDataContext.Provider
			value={{
				getMetadata,
				getSurvey,
				getSurveyUnitData,
				getReferentiel,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
