import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAPI, useAPIRemoteData, useAuth } from 'utils/hooks';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { CookieConsent } from 'components/shared/cookieConsent';
import { LoaderSimple } from 'components/shared/loader';
import { Orchestrator } from './../collector';
import { EventsManager, INIT_ORCHESTRATOR_EVENT } from 'utils/events';
import {
  ORCHESTRATOR_COLLECT,
  ORCHESTRATOR_READONLY,
  READ_ONLY,
} from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
  },
}));

const OrchestratorManger = () => {
  const classes = useStyles();
  const [source, setSource] = useState(false);
  const { readonly, idQ, idSU } = useParams();

  const LOGGER = EventsManager.createEventLogger(
    idQ,
    idSU,
    readonly === READ_ONLY ? ORCHESTRATOR_READONLY : ORCHESTRATOR_COLLECT
  );
  const {
    suData,
    questionnaire,
    metadata,
    loading,
    errorMessage,
  } = useAPIRemoteData(idSU, idQ);
  const { putSuData } = useAPI(idSU, idQ);
  const { logout } = useAuth();

  const [, /*sending*/ setSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  const sendData = async dataToSave => {
    setErrorSending(null);
    setSending(true);
    const { /*status,*/ error } = await putSuData(dataToSave);
    setSending(false);
    if (error) setErrorSending('Error during sending');
  };

  const logoutAndClose = async surveyUnit => {
    logout();
  };

  useEffect(() => {
    if (!loading && questionnaire) {
      const { label: questionnaireTitle } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource(questionnaire);
      LOGGER.log(INIT_ORCHESTRATOR_EVENT);
    }
  }, [questionnaire, loading, LOGGER]);

  return (
    <Box className={classes.root}>
      {loading && <LoaderSimple />}
      {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
      {!loading && metadata && suData && questionnaire && source && (
        <Orchestrator
          stromaeData={suData}
          source={source}
          metadata={metadata}
          logoutAndClose={logoutAndClose}
          save={sendData}
          savingType="COLLECTED"
          preferences={['PREVIOUS', 'COLLECTED']}
          features={['VTL', 'MD']}
          pagination={true}
        />
      )}
      {errorSending && <h2>Error lors de l'envoie</h2>}
      <CookieConsent />
    </Box>
  );
};
export default OrchestratorManger;
