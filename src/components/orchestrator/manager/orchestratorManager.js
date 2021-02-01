import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { READ_ONLY } from 'utils/constants';
import { useAPI, useAuth, usePutData, useRemoteData } from 'utils/hooks';
import { Button, Container, Typography } from '@material-ui/core';
import { CookieConsent } from 'components/shared/cookieConsent';
import { LoaderLogo, LoaderSimple } from 'components/shared/loader';
import { AppBar } from 'components/navigation/appBar';
import Orchestrator from '../collector';
import { buildQuestionnaire } from 'utils/questionnaire/build';

const OrchestratorManger = () => {
  const [source, setSource] = useState(false);
  const { oidcUser, logout } = useAuth();
  const isAuthenticated = oidcUser?.profile;
  const { readonly, idQ, idSU } = useParams();
  const { data, questionnaire, loading, errorMessage } = useRemoteData(
    idSU,
    idQ
  );
  const { putData } = useAPI(idQ, idSU);

  const [sending, setSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  const sendData = async dataToSave => {
    setErrorSending(null);
    setSending(true);
    const { status, error } = await putData(dataToSave);
    console.log(dataToSave);
    setSending(false);
    if (error) setErrorSending('Error during sending');
  };

  useEffect(() => {
    if (!loading && questionnaire) {
      setSource({
        ...questionnaire,
        components: buildQuestionnaire(questionnaire.components),
      });
    }
  }, [questionnaire, loading]);

  return (
    <>
      <AppBar
        isAuthenticated={isAuthenticated}
        logout={logout}
        title={questionnaire?.label}
      />
      <Container maxWidth="md" component="main">
        {loading && <LoaderSimple />}
        {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
        {!loading && data && questionnaire && source && (
          <Orchestrator
            stromaeData={data}
            source={source}
            save={sendData}
            savingType="COLLECTED"
            preferences={['COLLECTED']}
            features={['VTL']}
          />
        )}
      </Container>
      {errorSending && <h2>Error lors de l'envoie</h2>}
      <CookieConsent />
    </>
  );
};
export default OrchestratorManger;
