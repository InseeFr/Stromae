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
            <RespondantsList metadata={metadata} />
            <div className="fr-col-12">
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
            <div className="fr-col-12">
                <div className={fr.cx('fr-accordions-group')}>
                    <Accordion label="Quel est le cadre légal de l'enquête?">Content of the Accordion 1</Accordion>
                    <Accordion label="Name of the Accordion 2">Content of the Accordion 2</Accordion>
                </div>
            </div>
        </div >
    )

}
