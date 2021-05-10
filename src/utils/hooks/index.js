import { useLocation } from 'react-router-dom';

export * from './api';
export * from './auth';

export const useVisuQuery = () => {
  const searchUrl = new URLSearchParams(useLocation().search);
  const questionnaireUrl = searchUrl.get('questionnaire');
  const metadataUrl = searchUrl.get('metadata');
  const dataUrl = searchUrl.get('data');
  return { questionnaireUrl, metadataUrl, dataUrl };
};
