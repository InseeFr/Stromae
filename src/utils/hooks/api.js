import { AppContext } from 'App';
import { errorDictionary } from 'i18n';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API } from 'utils/api';
import { DEFAULT_DATA_URL, DEFAULT_METADATA_URL, OIDC } from 'utils/constants';
import { useAuth } from './auth';
import { getFetcherForLunatic } from 'utils/api/fetcher';

const getErrorMessage = (response, type = 'q') => {
  const { status } = response;
  if (status === 401) return errorDictionary.getError401;
  if (status === 403) return errorDictionary.getError403(type);
  if (status === 404) return errorDictionary.getError404(type);
  if (status >= 500 && status < 600) return errorDictionary.getErrorServeur;
  return errorDictionary.getUnknownError;
};

export const useLunaticFetcher = () => {
  const { authenticationType, oidcUser } = useAuth();

  const lunaticFetcher = useCallback(
    (url, options) => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return getFetcherForLunatic(token)(url, options);
    },
    [authenticationType, oidcUser]
  );

  return { lunaticFetcher };
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { authenticationType, oidcUser } = useAuth();
  const { apiUrl } = useContext(AppContext);

  const getRequiredNomenclatures = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getRequiredNomenclatures(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getNomenclature = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getNomenclature(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getQuestionnaire = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getQuestionnaire(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getMetadata = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getMetadata(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, oidcUser]);

  const getSuData = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getSuData(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, oidcUser]);

  const getPDF = useCallback(() => {
    const token = authenticationType === OIDC ? oidcUser?.access_token : null;
    return API.getDepositProof(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, oidcUser]);

  const putSuData = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.putSuData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, oidcUser]
  );

  const putData = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.putData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, oidcUser]
  );

  const putStateData = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.putStateData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, oidcUser]
  );

  const postParadata = useCallback(
    body => {
      const token = authenticationType === OIDC ? oidcUser?.access_token : null;
      return API.postParadata(apiUrl)(token)(body);
    },
    [apiUrl, authenticationType, oidcUser]
  );

  return {
    getRequiredNomenclatures,
    getNomenclature,
    getQuestionnaire,
    getMetadata,
    getSuData,
    getPDF,
    putSuData,
    postParadata,
    putData,
    putStateData,
  };
};

export const useAPIRemoteData = (surveyUnitID, questionnaireID) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [suData, setSuData] = useState(null);
  const [nomenclatures, setNomenclatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    getSuData,
    getRequiredNomenclatures,
    getQuestionnaire,
    getMetadata,
  } = useAPI(surveyUnitID, questionnaireID);

  useEffect(() => {
    if (questionnaireID && surveyUnitID) {
      setErrorMessage(null);
      setNomenclatures(null);
      const load = async () => {
        const qR = await getQuestionnaire();
        const nR = await getRequiredNomenclatures();
        if (!qR.error) {
          setQuestionnaire(qR.data.value);
          setNomenclatures(nR.data);
          const mR = await getMetadata();
          console.log(mR);
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await getSuData();
            console.log(dR);
            if (!dR.error) {
              setSuData(dR.data);
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

  return {
    loading,
    errorMessage,
    suData,
    questionnaire,
    metadata,
    nomenclatures,
  };
};

export const useRemoteData = (questionnaireUrl, metadataUrl, dataUrl) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [suData, setSuData] = useState(null);
  const [nomenclatures, setNomenclatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (questionnaireUrl) {
      setErrorMessage(null);
      setQuestionnaire(null);
      setNomenclatures(null);
      setSuData(null);
      const fakeToken = null;
      const load = async () => {
        const qR = await API.getRequest(questionnaireUrl)(fakeToken);
        if (!qR.error) {
          setQuestionnaire(qR.data);
          setNomenclatures([]); // fake nomenclatures for vizu
          const mR = await API.getRequest(metadataUrl || DEFAULT_METADATA_URL)(
            fakeToken
          );
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await API.getRequest(dataUrl || DEFAULT_DATA_URL)(
              fakeToken
            );
            if (!dR.error) {
              setSuData(dR.data);
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

  return {
    loading,
    errorMessage,
    suData,
    questionnaire,
    metadata,
    nomenclatures,
  };
};
