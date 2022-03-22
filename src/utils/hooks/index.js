import { useLocation } from 'react-router-dom';

export * from './api';
export * from './useConstCallback';

export const useVisuQuery = () => {
  const searchUrl = new URLSearchParams(useLocation().search);
  const questionnaireUrl = searchUrl.get('questionnaire');
  const metadataUrl = searchUrl.get('metadata');
  const dataUrl = searchUrl.get('data');
  const readonly = searchUrl.get('readonly') === 'true';
  return { questionnaireUrl, metadataUrl, dataUrl, readonly };
};
