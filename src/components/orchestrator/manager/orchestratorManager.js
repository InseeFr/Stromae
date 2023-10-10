import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AppContext } from 'App';
import { AuthContext } from 'components/auth/provider';
import { LoaderSimple } from 'components/shared/loader';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ORCHESTRATOR_COLLECT,
  ORCHESTRATOR_READONLY,
  READ_ONLY,
} from 'utils/constants';
import {
  EventsManager,
  INIT_ORCHESTRATOR_EVENT,
  INIT_SESSION_EVENT,
} from 'utils/events';
import { useAPI, useAPIRemoteData, useGetReferentiel } from 'utils/hooks';
import { Orchestrator } from './../collector';

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

  const { suData, questionnaire, metadata, loading, errorMessage } =
    useAPIRemoteData(idSU, idQ);

  const { putData, putStateData, postParadata } = useAPI(idSU, idQ);

  const { logout, oidcUser, isUserLoggedIn } = useContext(AuthContext);

  const { getReferentiel } = useGetReferentiel();

  const [errorSending, setErrorSending] = useState(null);

  const sendData = async (dataToSave) => {
    if (!readonly) {
      const { data, stateData } = dataToSave;
      const { /*status,*/ error: dataError } = await putData(data);
      const { /*status,*/ error: stateDataError } = await putStateData(
        stateData
      );
      const paradatas = LOGGER.getEventsToSend();
      const { error: paradataPostError } = await postParadata(paradatas);
      if (dataError || stateDataError || paradataPostError)
        if (paradataPostError) setErrorSending('Error during sending');
      LOGGER.clear();
    }
  };

  const logoutAndClose = () => {
    logout('portail');
  };

  useEffect(() => {
    if (isUserLoggedIn && questionnaire) {
      LOGGER.addMetadata({ idSession: oidcUser?.session_state });
      LOGGER.log(INIT_SESSION_EVENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, LOGGER, questionnaire]);

  useEffect(() => {
    if (!loading && questionnaire) {
      const {
        label: { value: questionnaireTitle },
      } = questionnaire;
      window.document.title = questionnaireTitle;
      setSource(questionnaire);
      LOGGER.log(INIT_ORCHESTRATOR_EVENT);
    }
  }, [questionnaire, loading, apiUrl, LOGGER]);

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
          autoSuggesterLoading={true}
          getReferentiel={getReferentiel}
          save={sendData}
          savingType='COLLECTED'
          preferences={['COLLECTED']}
          features={['VTL', 'MD']}
          pagination={true}
          activeControls={true}
          readonly={readonly}
        />
      )}
      {errorSending && <h2>Error lors de l'envoie</h2>}
    </Box>
  );
};
export default OrchestratorManager;
