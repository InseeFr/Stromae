import { useNavigate } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import { ReactComponent as Confirmation } from '../../assets/confirmation.svg';
import AdditionalInformation from './AdditionalInformation';

export function PostSubmitSurvey() {
  const navigate = useNavigate();


  const { getMetadata } = useContext(loadSourceDataContext);
  const metadata = useRemote<any>(getMetadata, navigateError);
  const submit = metadata?.Submit || false;
  const { DescriptionAdditional } = submit;

  function navigateError() {
    navigate('/');
  }

  //to do: onClick : dowload confirmation receipt
  // to do: add dynamic submission date and time
  const submissionDate = "16/01/2022 à 10h30"

  if (!metadata) {
    return <Skeleton />;
  }

  return (
    <div className="fr-grid-row fr-my-6w fr-my-md-12w">
      <div className="fr-col-12 fr-col-lg-6 fr-col-offset-lg-1">
        <h1>L'Insee vous remercie pour votre collaboration à cette enquête.</h1>
        <p className="fr-text--lead">Vos réponses ont été envoyées le {submissionDate}. {DescriptionAdditional} </p>
        <Button>
          Télécharger l'accusé de réception
        </Button>
      </div>
      <div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-12 fr-col--middle fr-btns-group--center">
        <Confirmation />
      </div>
      <AdditionalInformation submit={submit}/>
    </div>
  );
}
