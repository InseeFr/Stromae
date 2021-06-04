import React, { useEffect, useState } from 'react';
import { Orchestrator } from 'components/orchestrator/collector';
import { useRemoteData, useVisuQuery } from 'utils/hooks';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { LoaderSimple } from 'components/shared/loader';
import QuestionnaireForm from './questionnaireForm';
import { downloadDataAsJson } from 'utils/questionnaire';
import { useHistory } from 'react-router';
import { EventsManager, INIT_ORCHESTRATOR_EVENT } from 'utils/events';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
  },
}));

const Visualizer = () => {
  const classes = useStyles();
  const [source, setSource] = useState(false);

  const LOGGER = EventsManager.createEventLogger('fake q', 'fake Su');
  const history = useHistory();

  const { questionnaireUrl, metadataUrl, dataUrl } = useVisuQuery();
  const {
    suData,
    questionnaire,
    metadata,
    loading,
    errorMessage,
  } = useRemoteData(questionnaireUrl, metadataUrl, dataUrl);

  const sendData = surveyUnit => {};

  const logoutAndClose = async surveyUnit => {
    downloadDataAsJson(surveyUnit, `data-${surveyUnit?.stateData?.date}`);
    const paradatas = EventsManager.getLogger().getEventsToSend();
    downloadDataAsJson(paradatas, `paradata-${surveyUnit?.stateData?.date}`);
    history.push('/');
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
    <>
      {questionnaireUrl && (
        <Box className={classes.root}>
          {loading && <LoaderSimple />}
          {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
          {!loading && metadata && suData && questionnaire && source && (
            <Orchestrator
              stromaeData={suData}
              source={source}
              metadata={metadata}
              save={sendData}
              savingType="COLLECTED"
              preferences={['PREVIOUS', 'COLLECTED']}
              features={['VTL', 'MD']}
              logoutAndClose={logoutAndClose}
              pagination={true}
            />
          )}
        </Box>
      )}
      {!questionnaireUrl && <QuestionnaireForm />}
    </>
  );
};
export default Visualizer;
