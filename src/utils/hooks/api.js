import { useContext, useEffect, useState, useCallback } from 'react';
import { useConstCallback } from './useConstCallback';
import { AppContext } from 'App';
import { errorDictionary } from 'i18n';
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
  const { authenticationType, accessToken } = useAuth();
  const lunaticFetcher = useCallback(
    (url, options) => {
      const token = authenticationType === OIDC ? accessToken : null;
      return getFetcherForLunatic(token)(url, options);
    },
    [authenticationType, accessToken]
  );

  return { lunaticFetcher };
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { apiUrl } = useContext(AppContext);
  const { authenticationType, accessToken } = useAuth();

  const getRequiredNomenclatures = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getRequiredNomenclatures(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, accessToken]);

  const getNomenclature = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getNomenclature(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, accessToken]);

  const getQuestionnaire = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getQuestionnaire(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, accessToken]);

  const getMetadata = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getMetadata(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, authenticationType, accessToken]);

  const getSuData = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getSuData(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, accessToken]);

  const getPDF = useConstCallback(() => {
    const token = authenticationType === OIDC ? accessToken : null;
    return API.getDepositProof(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, authenticationType, accessToken]);

  const putSuData = useConstCallback(
    body => {
      const token = authenticationType === OIDC ? accessToken : null;
      return API.putSuData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, accessToken]
  );

  const putData = useConstCallback(
    body => {
      const token = authenticationType === OIDC ? accessToken : null;
      return API.putData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, accessToken]
  );

  const putStateData = useConstCallback(
    body => {
      const token = authenticationType === OIDC ? accessToken : null;
      return API.putStateData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, authenticationType, accessToken]
  );

  const postParadata = useConstCallback(
    body => {
      const token = authenticationType === OIDC ? accessToken : null;
      return API.postParadata(apiUrl)(token)(body);
    },
    [apiUrl, authenticationType, accessToken]
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
