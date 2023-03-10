import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/layout';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useDocumentTitle } from '../../useDocumentTitle';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { useRemote } from '../../components/orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../../components/loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';


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
            <div className="fr-col-lg-6 fr-col-12">
                <h1>Bienvenue sur l'{metadata.Welcome.Enq_LibelleEnquete}</ h1>
            </div>
            <div className="fr-col-lg-6 fr-col-12">
                <p>{metadata.Welcome.Enq_ObjectifsCourts}</ p>
            </div>
        </div>

    )

}
