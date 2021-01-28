import { fetcher, fetcherFile } from './fetcher';

const getRequest = url => token => fetcher(url, token, 'GET', null);
const putRequest = url => token => body => fetcher(url, token, 'PUT', body);

/* SurveyUnit's data */
const getData = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/survey-unit/${id}/data`)(token);
const putData = apiUrl => id => token => body =>
  putRequest(`${apiUrl}/api/survey-unit/${id}/data`)(token)(body);

/* Questionnaire's resource*/
const getQuestionnaire = apiUrl => id => token =>
  getRequest(`${apiUrl}/api/campaign/${id}/questionnaire`)(token);

const getDepositProof = apiUrl => id => token => filename =>
  fetcherFile(`${apiUrl}/api/survey-unit/${id}/deposit-proof`, token, filename);

export const API = { getData, putData, getQuestionnaire, getDepositProof };
