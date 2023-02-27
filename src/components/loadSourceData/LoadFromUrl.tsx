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
						if (urlNomenclatures && name in urlNomenclatures) {
							const url = urlNomenclatures[name];
							return publicRequest<Array<string>>(HTTP_VERBS.get, url);
						}
						console.warn(`unprovided nomenclature's url for ${name}`);
						return [];
					})
				).then(function (results) {
					return results.reduce(function (a, data, index) {
						return { ...a, [required[index]]: data };
					}, {});
				});

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
