import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import { Layout } from '../../components/layout';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { ReactComponent as Information } from '../../assets/information.svg';
import { useDocumentTitle } from '../../useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';

type PortailProps = {};

export function Deconnexion(props: PortailProps) {
	const { survey, unit } = useParams();
	useDocumentTitle('Page de déconnexion');
	const { login, isAuthenticated } = useOidc();

	const navigate = useNavigate();

	const onClick = useCallback(
		function () {
			login();
		},
		[login]
	);

	useEffect(
		function () {
			if (isAuthenticated) {
				navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`);
			}
		},
		[isAuthenticated, navigate, survey, unit]
	);

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
						<div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-8 fr-mt-6w fr-col--middle">
							<Information />
						</div>
					</div>
				</div>
			</Layout>
		</LoadFromApi>
	);
}
