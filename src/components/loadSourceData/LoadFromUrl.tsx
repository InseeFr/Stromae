import { PropsWithChildren, useCallback } from 'react';
import type { LunaticSource } from '../../typeLunatic/type-source';
import { publicGetRequest } from '../../lib/commons/axios-utils';
import { SurveyUnitData, MetadataSurvey } from '../../typeStromae/type';
import { loadSourceDataContext } from './LoadSourceDataContext';
import { DEFAULT_HEADER } from '../Header/default-header';
import { DEFAULT_FOOTER } from '../footer/default-footer';
import { DEFAULT_SUBMIT } from '../postSubmit/default-submit';

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

const NO_DATA: SurveyUnitData = {
	data: {},
	stateData: {
		state: 'INIT',
		date: 0,
		currentPage: '1',
	},
	personalization: null,
};

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
		return {
			Header: DEFAULT_HEADER,
			Footer: DEFAULT_FOOTER,
			Submit: DEFAULT_SUBMIT,
		};
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
		return NO_DATA;
	}, [urlData]);

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
				putSurveyUnitData: doNothing,
				putSurveyUnitStateData: doNothing,
				getDepositProof,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}
