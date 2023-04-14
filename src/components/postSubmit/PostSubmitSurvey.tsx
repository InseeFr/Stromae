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
  const submit = metadata?.Submit || false;

  function navigateError() {
    navigate('/');
  }

  //to do: onClick : dowload confirmation receipt
  // to do: add dynamic submission date and time
  const submissionDate = "16/01/2022 à 10h30"

  const hasAdditionalInformation = submit && submit.TitleAdditionalInformation && (submit.Feedback || submit.Results)

  if (!metadata) {
    return <Skeleton />;
  }

  return (
    <div className="fr-grid-row fr-my-6w fr-my-md-12w">
      <div className="fr-col-12 fr-col-lg-6 fr-col-offset-lg-1">
        <h1>L'Insee vous remercie pour votre collaboration à cette enquête.</h1>
        <p className="fr-text--lead">Vos réponses ont été envoyées le {submissionDate}. {submit.DescriptionAdditional} </p>

        <Button>
          Télécharger l'accusé de réception
        </Button>
      </div>
      <div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-12 fr-col--middle fr-btns-group--center">
        <Confirmation />
      </div>
      {hasAdditionalInformation &&
        <><div className="fr-col-12 fr-col-lg-6 fr-mt-9w fr-col-offset-lg-1">
          <h2>{submit.TitleAdditionalInformation}</h2>
        </div>
          {submit && submit.Feedback &&
            <div className="fr-p-md-3w fr-col-12 fr-col-lg-5 fr-col-offset-lg-1">
              <h6>{submit.Feedback.title}</h6>
              {submit.Feedback.link.href &&
                <a title={`${submit.Feedback.link.label} - ouvre une nouvelle fenêtre`} href={submit.Feedback.link.href}>
                  {submit.Feedback.link.imageSrc ? <img src={submit.Feedback.link.imageSrc} alt="" /> : submit.Feedback.link.label}
                </a>}
            </div>
          }
          {submit && submit.Results &&
            <div className="fr-p-md-3w fr-col-12 fr-col-lg-5 fr-col-offset-lg-1 fr-mt-5w fr-mt-md-0 fr-p-lg-3w">
              <h6>{submit.Results.title}</h6>
              <a title={`${submit.Results.link.label} - ouvre une nouvelle fenêtre`} href={submit.Results.link.href} target="_blank" rel="noopener">{submit.Results.link.label}</a>
            </div>
          }
        </>
      }
    </div>
  );
}
