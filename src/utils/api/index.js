import { fetcher, fetcherFile } from './fetcher';

const getRequest = (url) => (token) => fetcher(url, token, 'GET', null);
const putRequest = (url) => (token) => (body) =>
  fetcher(url, token, 'PUT', body);
const postRequest = (url) => (token) => (body) =>
  fetcher(url, token, 'POST', body);

/* SurveyUnit's data */
const getSuData = (apiUrl) => (id) => (token) =>
  getRequest(`${apiUrl}/api/survey-unit/${id}`)(token);
const putSuData = (apiUrl) => (id) => (token) => (body) =>
  putRequest(`${apiUrl}/api/survey-unit/${id}`)(token)(body);

const putData = (apiUrl) => (id) => (token) => (body) =>
  putRequest(`${apiUrl}/api/survey-unit/${id}/data`)(token)(body);

const putStateData = (apiUrl) => (id) => (token) => (body) =>
  putRequest(`${apiUrl}/api/survey-unit/${id}/state-data`)(token)(body);

/* Questionnaire's resource */
const getQuestionnaire = (apiUrl) => (id) => (token) =>
  getRequest(`${apiUrl}/api/questionnaire/${id}`)(token);

const getRequiredNomenclatures = (apiUrl) => (id) => (token) =>
  getRequest(`${apiUrl}/api/questionnaire/${id}/required-nomenclatures`)(token);

const getNomenclature = (apiUrl) => (id) => (token) =>
  getRequest(`${apiUrl}/api/nomenclature/${id}`)(token);

const getMetadata = (apiUrl) => (id) => (token) =>
  getRequest(`${apiUrl}/api/questionnaire/${id}/metadata`)(token);

const getDepositProof = (apiUrl) => (id) => (token) =>
  fetcherFile(`${apiUrl}/api/survey-unit/${id}/deposit-proof`, token);

/* Paradata */
const postParadata = (apiUrl) => (token) => (body) =>
  postRequest(`${apiUrl}/api/paradata`)(token)(body);

export const API = {
  getRequest,
  getSuData,
  putSuData,
  getQuestionnaire,
  getRequiredNomenclatures,
  getNomenclature,
  getMetadata,
  getDepositProof,
  postParadata,
  putData,
  putStateData,
};
