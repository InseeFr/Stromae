import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { PostSubmitSurvey } from '../../components/postSubmit';
import { AuthSecure } from '../../lib/oidc';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export function PostSubmit() {
	const { survey, unit } = useParams();
	useDocumentTitle("Page d'accueil");

	return (
		<AuthSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<PostSubmitSurvey />
				</Layout>
			</LoadFromApi>
		</AuthSecure>
	);
}
