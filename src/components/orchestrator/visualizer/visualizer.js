import React, { useEffect, useState } from 'react';
import { Orchestrator } from 'components/orchestrator/collector';
import { useRemoteData, useVisuQuery } from 'utils/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { LoaderSimple } from 'components/shared/loader';
import QuestionnaireForm from './questionnaireForm';
import { downloadDataAsJson } from 'utils/questionnaire';
import { useHistory } from 'react-router';
import { EventsManager, INIT_ORCHESTRATOR_EVENT } from 'utils/events';
import { ORCHESTRATOR_VIZUALISATION } from 'utils/constants';

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

  const history = useHistory();

  const LOGGER = EventsManager.createEventLogger({
    idQuestionnaire: 'fake q',
    idSurveyUnit: 'fake Su',
    idOrchestrator: ORCHESTRATOR_VIZUALISATION,
  });

  const { questionnaireUrl, metadataUrl, dataUrl, readonly } = useVisuQuery();
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
    const paradatas = LOGGER.getEventsToSend();
    downloadDataAsJson(paradatas, `paradata-${surveyUnit?.stateData?.date}`);
    history.push('/');
    LOGGER.clear();
  };

  useEffect(() => {
    if (!loading && questionnaire) {
      const { label: questionnaireTitle } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource(questionnaire);
      LOGGER.log(INIT_ORCHESTRATOR_EVENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionnaire, loading]);

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
              preferences={['COLLECTED']}
              features={['VTL', 'MD']}
              logoutAndClose={logoutAndClose}
              pagination={true}
              modalForControls={true}
              readonly={readonly}
            />
          )}
        </Box>
      )}
      {!questionnaireUrl && <QuestionnaireForm />}
    </>
  );
};
export default Visualizer;
