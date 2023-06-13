import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { PostSubmitSurvey } from '../../components/postSubmit';
import { OidcSecure } from '../../lib/oidc';

export function PostSubmit() {
	const { survey, unit } = useParams();
	useDocumentTitle("Page d'accueil");

	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<PostSubmitSurvey />
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
