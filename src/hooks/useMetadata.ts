import { useContext, useState } from 'react';
import { loadSourceDataContext } from '../components/loadSourceData/LoadSourceDataContext';
import { MetadataSurvey } from '../typeStromae/type';
import { useAsyncEffect } from './useAsyncEffect';

/**
 *
 * @returns
 */
export function useMetadata() {
	const [metadata, setMetadata] = useState<MetadataSurvey>();
	const { getMetadata } = useContext(loadSourceDataContext);

	useAsyncEffect(async () => {
		setMetadata(await getMetadata());
	}, [getMetadata]);

	return metadata;
}
