import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import { Button } from '@codegouvfr/react-dsfr/Button';

import { Layout } from '../../components/layout';
import Information from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/information.svg';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';

export function Deconnexion() {
	const { survey, unit } = useParams();
	useDocumentTitle('Page de déconnexion');
	const { login, isAuthenticated } = useOidc();

	const navigate = useNavigate();

	const onClick = useCallback(() => {
		login();
	}, [login]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`);
		}
	}, [isAuthenticated, navigate, survey, unit]);

	if (isAuthenticated) {
		return <></>;
	}

	return (
		<LoadFromApi survey={survey}>
			<Layout>
				<div className="fr-container">
					<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-6w fr-my-md-12w ">
						<div className="fr-col-lg-6 fr-col-12">
							<h1>Vous avez été déconnecté</h1>
							<p className="fr-mt-3w fr-text--lead">
								Vos réponses ont été sauvegardées, vous pourrez ainsi compléter
								ultèrieurement votre questionnaire.
							</p>
							<p className="fr-mt-3w fr-text--lead fr-text--bold">
								N'oubliez pas d'envoyer votre questionnaire une fois qu'il sera
								entièrement complété.
							</p>
							{/* To do: rediriger vers coltrane ou la page de connexion keycloak */}
							<Button size="large" onClick={onClick}>
								Se reconnecter
							</Button>
						</div>
						<div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-8 fr-col--middle">
							<svg
								className="fr-artwork"
								aria-hidden="true"
								viewBox="0 0 80 80"
								width="200px"
								height="200px"
							>
								<use
									className="fr-artwork-decorative"
									xlinkHref={`${Information}#artwork-decorative`}
								></use>
								<use
									className="fr-artwork-minor"
									xlinkHref={`${Information}#artwork-minor`}
								></use>
								<use
									className="fr-artwork-major"
									xlinkHref={`${Information}#artwork-major`}
								></use>
							</svg>
						</div>
					</div>
				</div>
			</Layout>
		</LoadFromApi>
	);
}
