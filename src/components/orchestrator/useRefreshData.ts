import { useContext, useEffect } from 'react';
import { useMetadata } from '../../hooks/useMetadata';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { LunaticData } from '../../typeLunatic/type';

type Args = {
	pageTag?: string;
	refreshData: (data: LunaticData) => void;
};

export function useRefreshData({ pageTag, refreshData }: Args) {
	const { getSurveyUnitData } = useContext(loadSourceDataContext);
	const metadata = useMetadata();
	const pages = metadata?.refreshDataOnPages;

	useEffect(() => {
		if (pageTag && pages) {
			if (pages.indexOf(pageTag) !== -1) {
				getSurveyUnitData?.().then((su) => {
					if (su) {
						refreshData(su.data);
					}
				});
			}
		}
	}, [pageTag, pages, refreshData, getSurveyUnitData]);
}
