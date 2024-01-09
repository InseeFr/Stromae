import { useEffect, useState } from 'react';
import { errorDictionary } from '../../i18n';
import { API } from '../api';
import { getFetcherForLunatic } from '../api/fetcher';
import { DEFAULT_DATA_URL, DEFAULT_METADATA_URL } from '../constants';
import { environment } from '../read-env-vars';
import { useAuth } from './useAuth';
import { useConstCallback } from './useConstCallback';

const { API_URL: apiUrl } = environment;

const getErrorMessage = (response, type = 'q') => {
  const { status } = response;
  if (status === 401) return errorDictionary.getError401;
  if (status === 403) return errorDictionary.getError403(type);
  if (status === 404) return errorDictionary.getError404(type);
  if (status >= 500 && status < 600) return errorDictionary.getErrorServeur;
  return errorDictionary.getUnknownError;
};

export const useGetReferentiel = (nomenclatures) => {
  const { oidc } = useAuth();

  const getReferentiel = useConstCallback((refName) => {
    const finalUrl = `${apiUrl}/api/nomenclature/${refName}`;
    return getFetcherForLunatic(oidc.getTokens().accessToken)(finalUrl);
  });

  const getReferentielForVizu = useConstCallback((refName) => {
    if (nomenclatures && Object.keys(nomenclatures).includes(refName)) {
      const finalUrl = nomenclatures[refName];
      return getFetcherForLunatic(null)(finalUrl);
    }
    // No nomenclature, return empty array to lunatic
    return Promise.resolve([]);
  });

  return { getReferentiel, getReferentielForVizu };
};

export const useAPI = (surveyUnitID, questionnaireID) => {
  const { oidc } = useAuth();

  const getRequiredNomenclatures = useConstCallback(() =>
    API.getRequiredNomenclatures(apiUrl)(questionnaireID)(
      oidc.getTokens().accessToken
    )
  );

  const getQuestionnaire = useConstCallback(() =>
    API.getQuestionnaire(apiUrl)(questionnaireID)(oidc.getTokens().accessToken)
  );

  const getMetadata = useConstCallback(() =>
    API.getMetadata(apiUrl)(questionnaireID)(oidc.getTokens().accessToken)
  );

  const getSuData = useConstCallback(() =>
    API.getSuData(apiUrl)(surveyUnitID)(oidc.getTokens().accessToken)
  );

  const getPDF = useConstCallback(() =>
    API.getDepositProof(apiUrl)(surveyUnitID)(oidc.getTokens().accessToken)
  );

  const putSuData = useConstCallback((body) =>
    API.putSuData(apiUrl)(surveyUnitID)(oidc.getTokens().accessToken)(body)
  );

  const putData = useConstCallback((body) =>
    API.putData(apiUrl)(surveyUnitID)(oidc.getTokens().accessToken)(body)
  );

  const putStateData = useConstCallback((body) =>
    API.putStateData(apiUrl)(surveyUnitID)(oidc.getTokens().accessToken)(body)
  );

  const postParadata = useConstCallback((body) =>
    API.postParadata(apiUrl)(oidc.getTokens().accessToken)(body)
  );

  return {
    getRequiredNomenclatures,
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
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { getSuData, getQuestionnaire, getMetadata } = useAPI(
    surveyUnitID,
    questionnaireID
  );

  useEffect(() => {
    if (questionnaireID && surveyUnitID) {
      setErrorMessage(null);
      const load = async () => {
        const qR = await getQuestionnaire();
        if (!qR.error) {
          setQuestionnaire(qR.data.value);
          const mR = await getMetadata();
          if (!mR.error) {
            setMetadata(mR.data);
            const dR = await getSuData();
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
  };
};

export const useRemoteData = (questionnaireUrl, metadataUrl, dataUrl) => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [suData, setSuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (questionnaireUrl) {
      setErrorMessage(null);
      setQuestionnaire(null);
      setSuData(null);
      const fakeToken = null;
      const load = async () => {
        const qR = await API.getRequest(questionnaireUrl)(fakeToken);
        if (!qR.error) {
          setQuestionnaire(qR.data);
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
  };
};
