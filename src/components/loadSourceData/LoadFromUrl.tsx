import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { publicGetRequest } from '../../lib/commons/axios-utils';
import { SurveyUnitData, MetadataSurvey } from '../../typeStromae/type';
import { loadSourceDataContext } from './LoadSourceDataContext';

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
	const getMetadata = useCallback(async () => {
		if (urlMetadata) {
			return publicGetRequest<MetadataSurvey>(urlMetadata);
		}
		return undefined;
	}, [urlMetadata]);
	const getSurvey = useCallback(async () => {
		if (urlSource) {
			return publicGetRequest<LunaticSource>(urlSource);
		}
		return undefined;
	}, [urlSource]);
	const getSurveyUnitData = useCallback(async () => {
		if (urlData) {
			return publicGetRequest<SurveyUnitData>(urlData);
		}
		return undefined;
	}, [urlData]);

	const putSurveyUnitData = useCallback(async () => {
		return true;
	}, []);

	const getReferentiel = useCallback(
		async (name: string): Promise<Array<unknown>> => {
			if (name in urlNomenclatures) {
				const url = urlNomenclatures[name];
				return publicGetRequest<Array<unknown>>(url);
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
