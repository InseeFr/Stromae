import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../../components/orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../../components/loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import { RespondantsList } from './RespondantsList';
import { WelcomeQuestions } from './WelcomeQuestions'

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

    const welcome = metadata.Welcome;

    return (
        <div className="fr-grid-row">
            <div className="fr-col-12">
                <h1>Bienvenue sur l'{welcome.Enq_LibelleEnquete}</ h1>
            </div>
            <div className="fr-col-12">
                <p className="fr-text--lead">{welcome.Enq_ObjectifsCourts}</ p>
            </div>
            <RespondantsList respondants={welcome.whoAnswers} />
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
                <h3>En savoir plus sur l'{welcome.Enq_LibelleEnquete}</ h3>
            </div>
            <div className="fr-col-12">
                <WelcomeQuestions welcome={metadata.Welcome} />
            </div>
        </div >
    )

}
