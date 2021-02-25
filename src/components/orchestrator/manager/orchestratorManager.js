import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAPI, useAPIRemoteData } from 'utils/hooks';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { CookieConsent } from 'components/shared/cookieConsent';
import { LoaderSimple } from 'components/shared/loader';
import Orchestrator from '../collector';
import { buildQuestionnaire } from 'utils/questionnaire/build';

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
  const { /*readonly,*/ idQ, idSU } = useParams();
  const {
    data,
    questionnaire,
    metadata,
    loading,
    errorMessage,
  } = useAPIRemoteData(idSU, idQ);
  const { putData } = useAPI(idSU, idQ);

  const [, /*sending*/ setSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  const sendData = async dataToSave => {
    setErrorSending(null);
    setSending(true);
    const { /*status,*/ error } = await putData(dataToSave);
    setSending(false);
    if (error) setErrorSending('Error during sending');
  };

  useEffect(() => {
    if (!loading && questionnaire) {
      const { label: questionnaireTitle, components } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource({
        ...questionnaire,
        components: buildQuestionnaire(components),
      });
    }
  }, [questionnaire, loading]);

  return (
    <Box className={classes.root}>
      {loading && <LoaderSimple />}
      {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
      {!loading && metadata && data && questionnaire && source && (
        <Orchestrator
          stromaeData={data}
          source={source}
          metadata={metadata}
          save={sendData}
          savingType="COLLECTED"
          preferences={['COLLECTED']}
          features={['VTL']}
        />
      )}
      {errorSending && <h2>Error lors de l'envoie</h2>}
      <CookieConsent />
    </Box>
  );
};
export default OrchestratorManger;
