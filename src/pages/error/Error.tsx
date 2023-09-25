import { useParams } from 'react-router-dom';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { ErrorPage } from './html/ErrorPage';

export function RouteError({ code }: { code?: number }) {
	const { survey, errorType } = useParams();
	return (
		<LoadFromApi survey={survey}>
			<ErrorPage code={code} errorType={errorType} />
		</LoadFromApi>
	);
}
