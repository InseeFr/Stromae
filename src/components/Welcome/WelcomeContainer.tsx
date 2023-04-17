import { useCallback , useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOidc , useOidcUser } from '@axa-fr/react-oidc';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Skeleton } from '@mui/material';

import { useRemote } from '../orchestrator/useRemote';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';


import { RespondantsList } from './RespondantsList';
import { WelcomeQuestions } from './WelcomeQuestions';


export function WelcomeContainer() {
	const navigate = useNavigate();
	const { survey, unit } = useParams();
	const { oidcUser } = useOidcUser();
	const { login } = useOidc();

	const { getMetadata } = useContext(loadSourceDataContext);
	const metadata = useRemote<any>(getMetadata, navigateError);
	const welcome = metadata?.Welcome;

	function navigateError() {
		navigate('/');
	}

  const onClick = useCallback(
		() => {
			if (oidcUser && survey && unit) {
				navigate(`/questionnaire/${survey}/unite-enquetee/${unit}`);
			} else {
				login();
			}
		},
		[oidcUser, login, survey, unit, navigate]
	);

	if (!metadata) {
		return <Skeleton />;
	}
	return (
    <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-6w">
			<div className="fr-col-12">
				<h1>Bienvenue sur l'{welcome.Enq_LibelleEnquete}</h1>
				<p className="fr-text--lead">{welcome.Enq_ObjectifsCourts}</p>
				<RespondantsList respondants={welcome.whoAnswers} />
				<Button className="fr-mt-2w" size="large" onClick={onClick}>
					Commencer
				</Button>
				<h3 className="fr-mt-5w">
					En savoir plus sur l'{welcome.Enq_LibelleEnquete}
				</h3>
				<WelcomeQuestions welcome={metadata.Welcome} />
			</div>
		</div>
	);
}
