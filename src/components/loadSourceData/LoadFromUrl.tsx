import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { getRequest } from '../../lib/commons/axios-utils';
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

async function doNothing(args: any) {
	return true;
}

async function getDepositProof() {
	return new Blob();
}

export function LoadFromUrl({
	children,
	urlSource,
	urlMetadata,
	urlData,
	urlNomenclatures = empty,
}: PropsWithChildren<LoadFromUrlProps>) {
	const getMetadata = useCallback(async () => {
		if (urlMetadata) {
			return getRequest<MetadataSurvey>(urlMetadata);
		}
		return undefined;
	}, [urlMetadata]);
	const getSurvey = useCallback(async () => {
		if (urlSource) {
			return getRequest<LunaticSource>(urlSource);
		}
		return undefined;
	}, [urlSource]);
	const getSurveyUnitData = useCallback(async () => {
		if (urlData) {
			return getRequest<SurveyUnitData>(urlData);
		}
		return undefined;
	}, [urlData]);

	const getReferentiel = useCallback(
		async (name: string): Promise<Array<unknown>> => {
			if (name in urlNomenclatures) {
				const url = urlNomenclatures[name];
				return getRequest<Array<unknown>>(url);
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
				putSurveyUnitData: doNothing,
				putSurveyUnitStateData: doNothing,
				getDepositProof,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
