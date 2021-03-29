import React, { useEffect, useState } from 'react';
import { Orchestrator } from 'components/orchestrator/collector';
import { useRemoteData, useVisuQuery } from 'utils/hooks';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { LoaderSimple } from 'components/shared/loader';
import { buildQuestionnaire } from 'utils/questionnaire/build';
import QuestionnaireForm from './questionnaireForm';

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

  const { questionnaireUrl, metadataUrl, dataUrl } = useVisuQuery();
  const {
    ueData,
    questionnaire,
    metadata,
    loading,
    errorMessage,
  } = useRemoteData(questionnaireUrl, metadataUrl, dataUrl);

  const sendData = async () => {
    console.log('nothing to do');
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
    <>
      {questionnaireUrl && (
        <Box className={classes.root}>
          {loading && <LoaderSimple />}
          {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
          {!loading && metadata && ueData && questionnaire && source && (
            <Orchestrator
              stromaeData={ueData}
              source={source}
              metadata={metadata}
              save={sendData}
              savingType="COLLECTED"
              preferences={['COLLECTED']}
              features={['VTL']}
            />
          )}
        </Box>
      )}
      {!questionnaireUrl && <QuestionnaireForm />}
    </>
  );
};
export default Visualizer;
