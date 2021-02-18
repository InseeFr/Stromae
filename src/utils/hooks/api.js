import { AppContext } from 'App';
import { errorDictionary } from 'i18n';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API } from 'utils/api';
import { DATA_EXAMPLE_URL, METADATA_EXAMPLE_URL, OIDC } from 'utils/constants';
import { useAuth } from './auth';

const getErrorMessage = (response, type = 'q') => {
  const { status } = response;
  if (status === 401) return errorDictionary.getError401;
  if (status === 403) return errorDictionary.getError403(type);
  if (status === 404) return errorDictionary.getError404(type);
  if (status >= 500 && status < 600) return errorDictionary.getErrorServeur;
  return errorDictionary.getUnknownError;
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { authenticationType, oidcUser } = useAuth();
  const { apiUrl } = useContext(AppContext);

  const getQuestionnaire = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getQuestionnaire(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getMetadata = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getMetadata(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getData = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getData(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, oidcUser]);

  const getPDF = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getDepositProof(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, oidcUser]);

  const putData = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.putData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, oidcUser]
  );

  return { getQuestionnaire, getMetadata, getData, getPDF, putData };
};

export const useAPIRemoteData = (surveyUnitID, questionnaireID) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { getData, getQuestionnaire, getMetadata } = useAPI(
    surveyUnitID,
    questionnaireID
  );

  useEffect(() => {
    if (questionnaireID && surveyUnitID) {
      const load = async () => {
        const qR = await getQuestionnaire();
        if (!qR.error) {
          setQuestionnaire(qR.data);
          const mR = await getMetadata();
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await getData();
            if (!dR.error) {
              setData(dR.data);
              setLoading(false);
            } else setErrorMessage(getErrorMessage(dR, 'd'));
            setLoading(false);
          } else setErrorMessage(getErrorMessage(mR, 'm'));
          setLoading(false);
        } else setErrorMessage(getErrorMessage(qR, 'q'));
        setLoading(false);
      };
      load();
    }
    // assume that we don't resend request to get data and questionnaire when token was refreshed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyUnitID, questionnaireID]);

  return { loading, errorMessage, data, questionnaire, metadata };
};

export const useRemoteData = (questionnaireUrl, metadataUrl, dataUrl) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (questionnaireUrl) {
      const fakeToken = null;
      const load = async () => {
        const qR = await API.getRequest(questionnaireUrl)(fakeToken);
        if (!qR.error) {
          setQuestionnaire(qR.data);
          const mR = await API.getRequest(metadataUrl || METADATA_EXAMPLE_URL)(
            fakeToken
          );
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await API.getRequest(dataUrl || DATA_EXAMPLE_URL)(
              fakeToken
            );
            if (!dR.error) {
              setData(dR.data);
              setLoading(false);
            } else setErrorMessage(getErrorMessage(dR, 'd'));
            setLoading(false);
          } else setErrorMessage(getErrorMessage(mR, 'm'));
          setLoading(false);
        } else setErrorMessage(getErrorMessage(qR, 'q'));
        setLoading(false);
      };
      load();
    }
  }, [questionnaireUrl, metadataUrl, dataUrl]);

  return { loading, errorMessage, data, questionnaire, metadata };
};
