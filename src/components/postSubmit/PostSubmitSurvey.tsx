import { useNavigate } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { useRemote } from '../orchestrator/useRemote';
import { useContext } from 'react';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import { Skeleton } from '@mui/material';
import { ReactComponent as Confirmation } from '../../assets/confirmation.svg';


export function PostSubmitSurvey() {
  const navigate = useNavigate();


  const { getMetadata } = useContext(loadSourceDataContext);
  const metadata = useRemote<any>(getMetadata, navigateError);
  const submit = metadata?.Submit;

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
    <div className="fr-grid-row fr-grid-row--center fr-my-6w fr-my-md-12w">
      <div className="fr-col-12 fr-col-lg-6">
        <h1>L'Insee vous remercie pour votre collaboration à cette enquête.</h1>
        <p className="fr-text--lead">Vos réponses ont été envoyées le {submissionDate}. {submit.TitleAdditionalInformation} </p>

        <Button>
          Télécharger l'accusé de réception
        </Button>
      </div>
      <div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-8 fr-mt-6w fr-col--middle">
        <Confirmation />
      </div>
      <div className="fr-col-12 fr-col-offset-lg-2 fr-mt-5w">
        <h2>{submit.TitleAdditionalInformation}</h2>
      </div>
      <div className="fr-col-4">
        <h6>{submit.Feedback.title}</h6>
        {submit.Feedback.link.href &&
          <a title={`${submit.Feedback.link.label} - ouvre une nouvelle fenêtre`} href={submit.Feedback.link.href}>
            {submit.Feedback.link.imageSrc ? <img src={submit.Feedback.link.imageSrc} alt="" /> : submit.Feedback.link.label}
          </a>
        }
      </div>
      <div className="fr-col-4 fr-col-offset-2">
        <h6>{submit.Results.title}</h6>
        <a title={`${submit.Results.link.label} - ouvre une nouvelle fenêtre`} href={submit.Results.link.href} target="_blank" rel="noopener" >{submit.Results.link.label}</a>
      </div>
    </div >
  );
}
