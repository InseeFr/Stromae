import { Accordion } from '@codegouvfr/react-dsfr/Accordion';
import { fr } from '@codegouvfr/react-dsfr';

import { WelcomeType } from './WelcomeType';
import { Link } from 'react-router-dom';

export function WelcomeQuestions(props: { welcome: WelcomeType }) {
	let caracteristiqueEnquete;

	if (
		props.welcome.Enq_CaractereObligatoire &&
		props.welcome.Enq_QualiteStatistique
	) {
		caracteristiqueEnquete =
			', reconnue d’intérêt général et de qualité statistique, est obligatoire';
	} else if (
		props.welcome.Enq_CaractereObligatoire &&
		!props.welcome.Enq_QualiteStatistique
	) {
		caracteristiqueEnquete = ' reconnue d’intérêt général est obligatoire';
	} else if (
		!props.welcome.Enq_CaractereObligatoire &&
		props.welcome.Enq_QualiteStatistique
	) {
		caracteristiqueEnquete =
			", de qualité statistique, est reconnue d'intérêt général";
	} else {
		caracteristiqueEnquete = " est reconnue d'intérêt général";
	}

	return (
		<div className={fr.cx('fr-accordions-group')}>
			{props.welcome.Enq_Faq_QuestionsAdditionnelles &&
				props.welcome.Enq_Faq_QuestionsAdditionnelles.map(
					(
						questionAdditionnelle: { question: string; contenu: string },
						index: number
					) => (
						<Accordion label={questionAdditionnelle.question} key={index}>
							{questionAdditionnelle.contenu}
						</Accordion>
					)
				)}
			<Accordion label="Quel est le cadre légal de l'enquête?">
				<p>
					Vu l'avis favorable du Conseil national de l'information statistique,
					cette enquête{caracteristiqueEnquete}, en application de{' '}
					<Link
						title="Loi n° 51 - 711 du 7 juin 1951 sur l'obligation, la coordination et le secret en matière de statistiques. - ouvre une nouvelle fenêtre"
						to={props.welcome.Loi_statistique.href}
						target={props.welcome.Loi_statistique.target}
						rel="noopener noreferrer"
					>
						la loi n° 51 - 711 du 7 juin 1951
					</Link>{' '}
					sur l'obligation, la coordination et le secret en matière de
					statistiques.
				</p>
				<p>
					Visa n°{props.welcome.Enq_NumeroVisa} du Ministre{' '}
					{props.welcome.Enq_MinistereTutelle}, valable pour{' '}
					{props.welcome.Enq_AnneeVisa}
					{props.welcome.Enq_ParutionJo
						? `Arrêté en date du ${props.welcome.Enq_DateParutionJo}`
						: 'Arrêté en cours de parution'}
					.
				</p>
				<p>
					Les réponses à ce questionnaire sont protégées par le secret
					statistique et destinées à {props.welcome.Enq_RespOperationnel}. Le{' '}
					<Link
						title="Règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD)"
						to={props.welcome.Loi_rgpd.href}
						target={props.welcome.Loi_rgpd.target}
						rel="noopener noreferrer"
					>
						règlement général 2016/679 du 27 avril 2016 sur la protection des
						données (RGPD)
					</Link>{' '}
					ainsi que la{' '}
					<Link
						title="loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés - ouvre une nouvelle fenêtre"
						to={props.welcome.Loi_informatique.href}
						target={props.welcome.Loi_informatique.target}
						rel="noopener noreferrer"
					>
						loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux
						fichiers et aux libertés
					</Link>{' '}
					s'appliquent à la présente enquête. Ils garantissent aux personnes
					concernées un droit d'accès, de limitation ou de rectification pour
					les données les concernant. Ce droit peut être exercé auprès de{' '}
					{props.welcome.Enq_RespTraitement}.
				</p>
			</Accordion>
		</div>
	);
}
