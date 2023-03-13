import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../../components/orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../../components/loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import { Accordion } from '@codegouvfr/react-dsfr/Accordion';
import { fr } from "@codegouvfr/react-dsfr";
import { RespondantsList } from './RespondantsList';

export function WelcomeContainer() {
    const navigate = useNavigate();
    function navigateError() {
        navigate('/');
    }

    const { getMetadata } = useContext(
        loadSourceDataContext
    );

    const metadata = useRemote<any>(getMetadata, navigateError);

    if (!metadata) return <Skeleton />

    return (
        <div className="fr-grid-row">
            <div className="fr-col-12">
                <h1>Bienvenue sur l'{metadata.Welcome.Enq_LibelleEnquete}</ h1>
            </div>
            <div className="fr-col-12">
                <p className="fr-text--lead">{metadata.Welcome.Enq_ObjectifsCourts}</ p>
            </div>
            <RespondantsList respondants={metadata.Welcome.whoAnswers} />
            <div className="fr-col-12 fr-mt-2w">
                {/* To do: rediriger vers la première question */}
                <Button
                    size="large"
                    linkProps={{
                        href: '/',
                    }}
                >
                    Commencer
                </Button>
            </div>
            <div className="fr-col-12 fr-mt-5w">
                <h3>En savoir plus sur l'{metadata.Welcome.Enq_LibelleEnquete}</ h3>
            </div>
            <div className="fr-col-12">
                <div className={fr.cx('fr-accordions-group')}>
                    <Accordion label="Quel est le cadre légal de l'enquête?">
                        <p>
                            Vu l'avis favorable du Conseil national de l'information statistique, cette enquête
                            {metadata.Welcome.Enq_CaractereObligatoire && metadata.Welcome.Enq_QualiteStatistique && ', reconnue d’intérêt général et de qualité statistique'}
                            {metadata.Welcome.Enq_CaractereObligatoire && !metadata.Welcome.Enq_QualiteStatistique && ' reconnue d’intérêt général'}
                            {metadata.Welcome.Enq_QualiteStatistique && !metadata.Welcome.Enq_CaractereObligatoire && ' de qualité statistique'}
                            {metadata.Welcome.Enq_CaractereObligatoire ? ' est obligatoire' : " est reconnue d'intérêt général"}, en application de la loi n° 51-711 du 7 juin 1951 sur l'obligation, la coordination et le secret en matière de statistiques.
                        </p>
                        <p>
                            Visa n°{metadata.Welcome.Enq_NumeroVisa} du Ministre {metadata.Welcome.Enq_MinistereTutelle}, valable pour l'année {metadata.Welcome.Enq_AnneeVisa} - Arrêté en {metadata.Welcome.Enq_DateParutionJo ? `en date du ${metadata.Welcome.Enq_DateParutionJo}` : "cours de parution"}.
                        </p>
                        <p>
                            Les réponses à ce questionnaire sont protégées par le secret statistique et destinées à {metadata.Welcome.Enq_RespOperationnel}.
                            Le règlement général 2016/679 du 27 avril 2016 sur la protection des données (RGPD) ainsi que la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, s'appliquent à la présente enquête. Ils garantissent aux personnes concernées un droit d'accès, de limitation ou de rectification pour les données les concernant. Ce droit peut être exercé auprès de {metadata.Welcome.Enq_RespTraitement}.
                        </p>
                    </Accordion>
                    {metadata.Welcome.Enq_QuestionsAdditionnelles.map((questionAdditionnelle: { question: string, contenu: string }, index: number) =>
                        <Accordion label={questionAdditionnelle.question} key={index}>{questionAdditionnelle.contenu}</Accordion>
                    )}
                </div>
            </div>
        </div >
    )

}
