import { WelcomeType } from "./WelcomeType";
import { Accordion } from '@codegouvfr/react-dsfr/Accordion';
import { fr } from "@codegouvfr/react-dsfr";

export function WelcomeQuestions(props: { welcome: WelcomeType }) {

    let caracteristiqueEnquete;

    if (props.welcome.Enq_CaractereObligatoire && props.welcome.Enq_QualiteStatistique) {
        caracteristiqueEnquete = ", reconnue d’intérêt général et de qualité statistique, est obligatoire";
    }
    else if (props.welcome.Enq_CaractereObligatoire && !props.welcome.Enq_QualiteStatistique) {
        caracteristiqueEnquete = ' reconnue d’intérêt général est obligatoire';
    }
    else if (!props.welcome.Enq_CaractereObligatoire && props.welcome.Enq_QualiteStatistique) {
        caracteristiqueEnquete = ", de qualité statistique, est reconnue d'intérêt général";
    }
    else {
        caracteristiqueEnquete = " est reconnue d'intérêt général"
    }

    return (
        <div className={fr.cx('fr-accordions-group')}>
            <Accordion label="Quel est le cadre légal de l'enquête?">
                <p>
                    Vu l'avis favorable du Conseil national de l'information statistique, cette enquête{caracteristiqueEnquete}, en application de <a title="Loi n° 51 - 711 du 7 juin 1951 sur l'obligation, la coordination et le secret en matière de statistiques. - ouvre une nouvelle fenêtre" href={props.welcome.Loi_statistique} target="_blank" rel="noopener noreferrer">la loi n° 51 - 711 du 7 juin 1951</a> sur l'obligation, la coordination et le secret en matière de statistiques.
                </p>
                <p>Visa n°{props.welcome.Enq_NumeroVisa} du Ministre {props.welcome.Enq_MinistereTutelle}, valable pour l'année {props.welcome.Enq_AnneeVisa} - Arrêté en {props.welcome.Enq_ParutionJo ? `en date du ${props.welcome.Enq_DateParutionJo}` : "cours de parution"}.</p>
                <p>Les réponses à ce questionnaire sont protégées par le secret statistique et destinées à {props.welcome.Enq_RespOperationnel}. Le <a title='Règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD)' href={props.welcome.Loi_rgpd} target='_blank' rel='noopener noreferrer'>règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD)</a> ainsi que la <a title="loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés - ouvre une nouvelle fenêtre" href={props.welcome.Loi_informatique} target='_blank' rel='noopener noreferrer'>loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés</a> s'appliquent à la présente enquête. Ils garantissent aux personnes concernées un droit d'accès, de limitation ou de rectification pour les données les concernant. Ce droit peut être exercé auprès de {props.welcome.Enq_RespTraitement}.</p>
            </Accordion>
            {props.welcome.Enq_QuestionsAdditionnelles && props.welcome.Enq_QuestionsAdditionnelles.map((questionAdditionnelle: { question: string, contenu: string }, index: number) =>
                <Accordion label={questionAdditionnelle.question} key={index}>{questionAdditionnelle.contenu}</Accordion>
            )
            }
        </div >
    )
}


