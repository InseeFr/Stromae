import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAPI, useAPIRemoteData } from 'utils/hooks';
import { AppContext } from 'App';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { LoaderSimple } from 'components/shared/loader';
import { Orchestrator } from './../collector';
import {
  EventsManager,
  INIT_ORCHESTRATOR_EVENT,
  INIT_SESSION_EVENT,
} from 'utils/events';
import {
  ORCHESTRATOR_COLLECT,
  ORCHESTRATOR_READONLY,
  READ_ONLY,
} from 'utils/constants';
import { buildSuggesterFromNomenclatures } from 'utils/questionnaire/nomenclatures';
import { AuthContext } from 'components/auth/provider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
  },
}));

const OrchestratorManger = () => {
  const { apiUrl } = useContext(AppContext);

  const classes = useStyles();
  const [source, setSource] = useState(false);
  const { readonly, idQ, idSU } = useParams();

  const LOGGER = EventsManager.createEventLogger({
    idQuestionnaire: idQ,
    idSurveyUnit: idSU,
    idOrchestrator:
      readonly === READ_ONLY ? ORCHESTRATOR_READONLY : ORCHESTRATOR_COLLECT,
  });

  const {
    suData,
    questionnaire,
    nomenclatures,
    metadata,
    loading,
    errorMessage,
  } = useAPIRemoteData(idSU, idQ);

  const { putData, putStateData, postParadata } = useAPI(idSU, idQ);

  const { logout, oidcUser, isUserLoggedIn } = useContext(AuthContext);

  const [suggesters, setSuggesters] = useState(null);

  const [, /*sending*/ setSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  const sendData = async dataToSave => {
    setErrorSending(null);
    setSending(true);
    const { data, stateData } = dataToSave;
    const { /*status,*/ error: dataError } = await putData(data);
    const { /*status,*/ error: stateDataError } = await putStateData(stateData);
    const paradatas = LOGGER.getEventsToSend();
    const { error: paradataPostError } = await postParadata(paradatas);
    setSending(false);
    if (dataError || stateDataError || paradataPostError)
      setErrorSending('Error during sending');
    if (!paradataPostError) LOGGER.clear();
  };

  const logoutAndClose = () => {
    logout();
  };

  useEffect(() => {
    if (isUserLoggedIn && questionnaire) {
      LOGGER.addMetadata({ idSession: oidcUser?.sub });
      LOGGER.log(INIT_SESSION_EVENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, LOGGER, questionnaire]);

  useEffect(() => {
    if (!loading && questionnaire && nomenclatures) {
      const { label: questionnaireTitle } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource(questionnaire);
      const suggestersBuilt = buildSuggesterFromNomenclatures(apiUrl)(
        nomenclatures
      );
      setSuggesters(suggestersBuilt);
      LOGGER.log(INIT_ORCHESTRATOR_EVENT);
    }
  }, [questionnaire, loading, nomenclatures, apiUrl, LOGGER]);

  return (
    <Box className={classes.root}>
      {loading && <LoaderSimple />}
      {!loading && errorMessage && <Typography>{errorMessage}</Typography>}
      {!loading &&
        metadata &&
        suData &&
        questionnaire &&
        suggesters &&
        source && (
          <Orchestrator
            stromaeData={suData}
            source={source}
            metadata={metadata}
            logoutAndClose={logoutAndClose}
            autoSuggesterLoading={true}
            suggesters={suggesters}
            save={sendData}
            savingType="COLLECTED"
            preferences={['COLLECTED']}
            features={['VTL', 'MD']}
            pagination={true}
            modalForControls={true}
            readonly={readonly}
            placeholderList="Rechercher ici ..."
          />
        )}
      {errorSending && <h2>Error lors de l'envoie</h2>}
    </Box>
  );
};
export default OrchestratorManger;
