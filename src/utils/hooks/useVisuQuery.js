import { useLocation } from 'react-router-dom';

export const useVisuQuery = () => {
  const searchUrl = new URLSearchParams(useLocation().search);
  const questionnaireUrl = searchUrl.get('questionnaire');
  const metadataUrl = searchUrl.get('metadata');
  const dataUrl = searchUrl.get('data');
  const readonly = searchUrl.get('readonly') === 'true';
  const stringNomenclature = searchUrl.get('nomenclature');
  return {
    questionnaireUrl,
    metadataUrl,
    dataUrl,
    readonly,
    nomenclatures: JSON.parse(stringNomenclature),
  };
};
