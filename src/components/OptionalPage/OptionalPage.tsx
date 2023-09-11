import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { uri404 } from '../../lib/domainUri';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { MetadataSurvey } from '../../typeStromae/type';

export function OptionalPage({ name }: { name?: string }) {
	const { getMetadata } = useContext(loadSourceDataContext);
	const [metadata, setMetadat] = useState<MetadataSurvey>();
	const navigate = useNavigate();

	useEffect(() => {
		if (name && metadata) {
			if (name in metadata) {
				// TODO
			} else {
				navigate(uri404());
			}
		}
	}, [name, metadata, navigate]);

	useAsyncEffect(async () => {
		setMetadat(await getMetadata());
	}, [getMetadata]);

	return <div>Optional</div>;
}
