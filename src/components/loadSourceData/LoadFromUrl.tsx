import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { publicGetRequest } from '../../lib/commons/axios-utils';
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
				return await publicGetRequest<MetadataSurvey>(urlMetadata);
			}
		},
		[urlMetadata]
	);
	const getSurvey = useCallback(
		async function () {
			if (urlSource) {
				return await publicGetRequest<LunaticSource>(urlSource);
			}
		},
		[urlSource]
	);
	const getSurveyUnitData = useCallback(
		async function () {
			if (urlData) {
				return await publicGetRequest<SurveyUnitData>(urlData);
			}
		},
		[urlData]
	);

	const putSurveyUnitData = useCallback(async function () {
		return true;
	}, []);

	const getReferentiel = useCallback(
		async function (name: string): Promise<Array<unknown>> {
			if (name in urlNomenclatures) {
				const url = urlNomenclatures[name];
				return await publicGetRequest<Array<unknown>>(url);
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
				putSurveyUnitData,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
