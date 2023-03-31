import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { WelcomeContainer } from '../../components/Welcome';

export function Welcome() {
	const { survey, unit } = useParams();
	useDocumentTitle("Page d'accueil");

	return (
		<LoadFromApi survey={survey} unit={unit}>
			<Layout>
				<WelcomeContainer />
			</Layout>
		</LoadFromApi>
	);
}
