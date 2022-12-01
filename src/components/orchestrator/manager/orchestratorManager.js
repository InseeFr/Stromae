import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAPI, useAPIRemoteData } from 'utils/hooks';
import { AppContext } from 'App';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
  },
}));

const OrchestratorManager = () => {
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

  const [errorSending, setErrorSending] = useState(null);

  const sendData = async (dataToSave) => {
    const { data, stateData } = dataToSave;
    const { /*status,*/ error: dataError } = await putData(data);
    const { /*status,*/ error: stateDataError } = await putStateData(stateData);
    const paradatas = LOGGER.getEventsToSend();
    const { error: paradataPostError } = await postParadata(paradatas);
    if (dataError || stateDataError || paradataPostError)
      if (paradataPostError) setErrorSending('Error during sending');
    LOGGER.clear();
  };

  const logoutAndClose = () => {
    logout('portail');
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
      const {
        label: { value: questionnaireTitle },
      } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource(questionnaire);
      const suggestersBuilt =
        buildSuggesterFromNomenclatures(apiUrl)(nomenclatures);
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
            savingType='COLLECTED'
            preferences={['COLLECTED']}
            features={['VTL', 'MD']}
            pagination={true}
            activeControls={true}
            modalForControls={true}
            readonly={readonly}
          />
        )}
      {errorSending && <h2>Error lors de l'envoie</h2>}
    </Box>
  );
};
export default OrchestratorManager;
