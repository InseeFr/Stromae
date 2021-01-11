import { AppContext } from 'App';
import Dictionary from 'i18n';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API } from 'utils/api';
import { OIDC } from 'utils/constants';
import { useAuth } from './auth';

const getErrorMessage = (response, questionnaire = true) => {
  const { status } = response;
  if (status === 401) return Dictionary.getError401;
  if (status === 403) return Dictionary.getError403(questionnaire);
  if (status === 404) return Dictionary.getError404(questionnaire);
  if (status >= 500 && status < 600) return Dictionary.getErrorServeur;
  return Dictionary.getUnknownError;
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { authenticationType, oidcUser } = useAuth();
  const { apiUrl } = useContext(AppContext);

  const getQuestionnaire = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getQuestionnaire(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getData = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getData(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, oidcUser]);

  const putData = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.putData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, oidcUser]
  );

  return { getQuestionnaire, getData, putData };
};

export const useRemoteData = (surveyUnitID, questionnaireID) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { getData, getQuestionnaire } = useAPI(surveyUnitID, questionnaireID);

  useEffect(() => {
    if (questionnaireID && surveyUnitID) {
      const load = async () => {
        const qR = await getQuestionnaire();
        if (!qR.error) {
          setQuestionnaire(qR.data);
          const dR = await getData();
          if (!dR.error) setData(dR.data);
          else setErrorMessage(getErrorMessage(dR, false));
        } else setErrorMessage(getErrorMessage(qR));
      };
      load();
    }
    // assume that we don't resend request to get data and questionnaire when token was refreshed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyUnitID, questionnaireID]);

  return { errorMessage, data, questionnaire };
};
