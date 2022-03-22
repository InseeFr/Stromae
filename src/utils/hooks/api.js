import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from 'App';
import { AuthContext } from 'components/auth/provider';
import { errorDictionary } from 'i18n';
import { API } from 'utils/api';
import { DEFAULT_DATA_URL, DEFAULT_METADATA_URL } from 'utils/constants';
import { getFetcherForLunatic } from 'utils/api/fetcher';
import { useConstCallback } from './useConstCallback';

const getErrorMessage = (response, type = 'q') => {
  const { status } = response;
  if (status === 401) return errorDictionary.getError401;
  if (status === 403) return errorDictionary.getError403(type);
  if (status === 404) return errorDictionary.getError404(type);
  if (status >= 500 && status < 600) return errorDictionary.getErrorServeur;
  return errorDictionary.getUnknownError;
};

export const useLunaticFetcher = () => {
  const { getAccessToken } = useContext(AuthContext);

  const lunaticFetcher = useConstCallback(
    async (url, options) => {
      const token = await getAccessToken();
      return getFetcherForLunatic(token)(url, options);
    },
    [getAccessToken]
  );

  return { lunaticFetcher };
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { getAccessToken } = useContext(AuthContext);
  const { apiUrl } = useContext(AppContext);

  const getRequiredNomenclatures = useCallback(async () => {
    const token = await getAccessToken();
    return API.getRequiredNomenclatures(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, getAccessToken]);

  const getNomenclature = useCallback(async () => {
    const token = getAccessToken();
    return API.getNomenclature(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, getAccessToken]);

  const getQuestionnaire = useCallback(async () => {
    const token = await getAccessToken();
    return API.getQuestionnaire(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, getAccessToken]);

  const getMetadata = useCallback(async () => {
    const token = await getAccessToken();
    return API.getMetadata(apiUrl)(questionnaireID)(token);
  }, [questionnaireID, apiUrl, getAccessToken]);

  const getSuData = useCallback(async () => {
    const token = await getAccessToken();
    return API.getSuData(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, getAccessToken]);

  const getPDF = useCallback(async () => {
    const token = await getAccessToken();
    return API.getDepositProof(apiUrl)(surveyUnitID)(token);
  }, [surveyUnitID, apiUrl, getAccessToken]);

  const putSuData = useCallback(
    async body => {
      const token = await getAccessToken();
      return API.putSuData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, getAccessToken]
  );

  const putData = useCallback(
    async body => {
      const token = await getAccessToken();
      return API.putData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, getAccessToken]
  );

  const putStateData = useCallback(
    async body => {
      const token = await getAccessToken();
      return API.putStateData(apiUrl)(surveyUnitID)(token)(body);
    },
    [surveyUnitID, apiUrl, getAccessToken]
  );

  const postParadata = useCallback(
    async body => {
      const token = await getAccessToken();
      return API.postParadata(apiUrl)(token)(body);
    },
    [apiUrl, getAccessToken]
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
