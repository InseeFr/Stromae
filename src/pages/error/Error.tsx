import { useParams } from 'react-router-dom';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { ErrorPage } from './html/ErrorPage';

export function Error({ code }: { code?: number }) {
	const { survey } = useParams();
	return (
		<LoadFromApi survey={survey}>
			<ErrorPage code={code} />
		</LoadFromApi>
	);
}
