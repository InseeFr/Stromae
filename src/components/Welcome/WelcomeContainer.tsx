import { useNavigate } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
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
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-6w">
            <div className="fr-col-12">
                <h1>Bienvenue sur l'{welcome.Enq_LibelleEnquete}</ h1>
                <p className="fr-text--lead">{welcome.Enq_ObjectifsCourts}</ p>
                <RespondantsList respondants={welcome.whoAnswers} />
                {/* To do: rediriger vers la première question */}
                <Button
                    className="fr-mt-2w"
                    size="large"
                    linkProps={{
                        href: '/',
                    }}
                >
                    Commencer
                </Button>
                <h3 className="fr-mt-5w">En savoir plus sur l'{welcome.Enq_LibelleEnquete}</ h3>
                <WelcomeQuestions welcome={metadata.Welcome} />
            </div>
        </div >
    )

}
