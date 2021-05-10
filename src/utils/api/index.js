import { fetcher, fetcherFile } from './fetcher';

const getRequest = url => token => fetcher(url, token, 'GET', null);
const putRequest = url => token => body => fetcher(url, token, 'PUT', body);

/* SurveyUnit's data */
const getSuData = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/survey-unit/${id}`)(token);
const putSuData = apiUrl => id => token => body =>
  putRequest(`${apiUrl}/api/survey-unit/${id}`)(token)(body);

/* Questionnaire's resource */
const getQuestionnaire = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/questionnaire/${id}`)(token);

const getMetadata = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/campaign/${id}/metadata`)(token);

const getDepositProof = apiUrl => id => token =>
  fetcherFile(`${apiUrl}/api/survey-unit/${id}/deposit-proof`, token);

export const API = {
  getRequest,
  getSuData,
  putSuData,
  getQuestionnaire,
  getMetadata,
  getDepositProof,
};
