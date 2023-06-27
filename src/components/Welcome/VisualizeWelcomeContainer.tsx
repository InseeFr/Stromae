import { useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Skeleton } from '@mui/material';

import { useRemote } from '../orchestrator/useRemote';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';

import { RespondantsList } from './RespondantsList';
import { WelcomeQuestions } from './WelcomeQuestions';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import ConvertContent from '../../utils/convertContent';
import { useColors } from '@codegouvfr/react-dsfr/useColors';
import { themeStringToVariable } from '../../utils/themeStringToVariable';




export function VisualizeWelcomeContainer() {
	const theme = useColors();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
  const resources = searchParams.get('resources');
	const { getMetadata } = useContext(loadSourceDataContext);
	const metadata = useRemote<any>(getMetadata, navigateError);
	const welcome = metadata?.Welcome;
	useDocumentTitle("Page d'accueil");

	function navigateError() {
		navigate('/');
	}


	const onClick = useCallback(() => {
		if (resources) {
			navigate({
        pathname: '/visualize',
		    search: `?resources=${resources}`,
      });
		} else {
      navigate({
        pathname: '/visualize'
      })
    }
	}, [ resources, navigate]);

	if (!metadata) {
		return <Skeleton />;
	}
	return (
		<div>
			<div className="fr-container fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-2w fr-my-md-8w">
				<div className="fr-col-12">
					<div className="fr-grid-row fr-grid-row--center fr-grid-row--middle">
						<div className="fr-col-md-6 fr-col-12">
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
						{welcome.Enq_Image && 
							<div className="fr-col-md-4 fr-col-8 fr-mt-2w">
								<img
									className="fr-responsive-img"
									src={welcome.Enq_Image}
									alt="decoration"
								></img>
							</div>
						}
					</div>
				</div>
			</div>

			<div
				className="fr-p-6w fr-grid-row fr-grid-row--center fr-grid-row--middle"
				style={{
					backgroundColor: themeStringToVariable(theme, welcome.Enq_colorTheme, theme.decisions.background.default.grey.default)
				}}
			>
				<div className="fr-col-xl-6 fr-col-lg-10 fr-col-12">
					<h2 className="fr-h4">
						En savoir plus sur l'{welcome.Enq_LibelleEnquete}
					</h2>
					<WelcomeQuestions welcome={metadata.Welcome} />
				</div>
			</div>
		</div>
	);
}
