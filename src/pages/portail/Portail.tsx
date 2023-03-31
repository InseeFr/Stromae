import { useEffect } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { WelcomeContainer } from '../../components/Welcome';

export function Portail() {
	const navigate = useNavigate();
	const { survey } = useParams();
	const { oidcUser } = useOidcUser();

	useEffect(
		function () {
			if (oidcUser) {
				const { preferred_username } = oidcUser;
				if (preferred_username) {
					navigate(
						`/questionnaire/${survey}/unite-enquetee/${preferred_username}`
					);
				}
			}
		},
		[oidcUser, navigate, survey]
	);

	return (
		<LoadFromApi survey={survey}>
			<Layout>
				<WelcomeContainer />
			</Layout>
		</LoadFromApi>
	);
}
