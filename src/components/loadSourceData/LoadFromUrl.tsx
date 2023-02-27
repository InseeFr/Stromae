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
	urlRequiredNomenclatures?: string;
	urlNomenclatures?: Record<string, string>;
};

function LoadFromUrl({
	children,
	urlSource,
	urlMetadata,
	urlData,
	urlRequiredNomenclatures,
	urlNomenclatures,
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

	const getRequiredNomenclatures = useCallback(
		async function () {
			if (urlRequiredNomenclatures) {
				const required = await publicRequest<Array<string>>(
					HTTP_VERBS.get,
					urlRequiredNomenclatures
				);

				const nomenclatures = await Promise.all(
					required.map(function (name) {
						debugger;
						const url =
							urlNomenclatures && name in urlNomenclatures
								? urlNomenclatures[name]
								: `/not-privided-url/${name}`;
						return publicRequest<Array<string>>(HTTP_VERBS.get, url);
					})
				);

				return nomenclatures;
			}
		},
		[urlRequiredNomenclatures, urlNomenclatures]
	);

	return (
		<loadSourceDataContext.Provider
			value={{
				getMetadata,
				getSurvey,
				getSurveyUnitData,
				getRequiredNomenclatures,
			}}
		>
			{children}
		</loadSourceDataContext.Provider>
	);
}

export default LoadFromUrl;
