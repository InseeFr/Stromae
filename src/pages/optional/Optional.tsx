import { useParams } from 'react-router';
import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { OptionalPage } from '../../components/OptionalPage';

export function Optional() {
	const { survey, optional } = useParams();

	return (
		<LoadFromApi survey={survey}>
			<Layout>
				<OptionalPage name={optional} />
			</Layout>
		</LoadFromApi>
	);
}
