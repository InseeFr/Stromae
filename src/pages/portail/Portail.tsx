import { useEffect } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc';
import { useNavigate, useParams } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { WelcomeContainer } from '../../components/Welcome';

/**
 * TODO filtrer sur DEFAULT_SURVEY
 */

export function Portail() {
	const navigate = useNavigate();
	const { survey } = useParams();
	const { oidcUser } = useOidcUser();

	useEffect(() => {
		if (!oidcUser || !oidcUser.preferred_username) {
			return;
		}
		navigate(
			`/questionnaire/${survey}/unite-enquetee/${oidcUser.preferred_username.toUpperCase()}`
		);
	}, [oidcUser, navigate, survey]);

	return (
		<LoadFromApi survey={survey}>
			<Layout>
				<WelcomeContainer />
			</Layout>
		</LoadFromApi>
	);
}
