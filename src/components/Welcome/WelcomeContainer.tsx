import { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Skeleton } from '@mui/material';

import { useRemote } from '../orchestrator/useRemote';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';

import { RespondantsList } from './RespondantsList';
import { WelcomeQuestions } from './WelcomeQuestions';
import { useDocumentTitle } from '../../useDocumentTitle';
import ConvertContent from '../../convertContent';
import { useColors } from '@codegouvfr/react-dsfr/useColors';

export function WelcomeContainer() {
	const theme = useColors();
	const navigate = useNavigate();
	const { survey, unit } = useParams();
	const { oidcUser } = useOidcUser();
	const { login } = useOidc();

	const { getMetadata } = useContext(loadSourceDataContext);
	const metadata = useRemote<any>(getMetadata, navigateError);
	const welcome = metadata?.Welcome;
	useDocumentTitle("Page d'accueil");

	function navigateError() {
		navigate('/');
	}

	const onClick = useCallback(() => {
		if (oidcUser && survey && unit) {
			navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`);
		} else {
			login();
		}
	}, [oidcUser, login, survey, unit, navigate]);

	if (!metadata) {
		return <Skeleton />;
	}
	return (
		<div>
			<div className="fr-container fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-2w fr-my-md-8w">
				<div className="fr-col-12">
					<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle">
						<div className="fr-col-6">
							<h1 className="fr-h2">
								Bienvenue sur l'{welcome.Enq_LibelleEnquete}
							</h1>
							<p className="fr-text--lead">
								<ConvertContent content={welcome.Enq_ObjectifsCourts} />
							</p>
							<RespondantsList respondants={welcome.whoAnswers} />
							<Button size="large" onClick={onClick}>
								Commencer
							</Button>
						</div>
						<div className="fr-col-4">
							<img
								className="fr-responsive-img"
								src="https://le-recensement-et-moi.fr/illu-femme-ordi.svg"
								alt="decoration"
							></img>
						</div>
					</div>
				</div>
			</div>

			<div
				className="fr-p-6w fr-grid-row fr-grid-row--center fr-grid-row--middle"
				style={{
					backgroundColor:
						theme.decisions.background.alt.greenTilleulVerveine.default,
				}}
			>
				<div className="fr-col-6">
					<h2 className="fr-h4">
						En savoir plus sur l'{welcome.Enq_LibelleEnquete}
					</h2>
					<WelcomeQuestions welcome={metadata.Welcome} />
				</div>
			</div>
		</div>
	);
}
