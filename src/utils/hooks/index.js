import { useHistory, useLocation } from 'react-router-dom';

export * from './api';
export * from './auth';

export const useVisuQuery = () => {
  const searchUrl = new URLSearchParams(useLocation().search);
  const questionnaireUrl = searchUrl.get('questionnaire');
  const metadataUrl = searchUrl.get('metadata');
  const dataUrl = searchUrl.get('data');
  const readonly = searchUrl.get('readonly') === 'true';
  return { questionnaireUrl, metadataUrl, dataUrl, readonly };
};

const encodePage = page => Buffer.from(page, 'utf-8').toString('base64');

const decodePage = page => Buffer.from(page, 'base64').toString('utf-8');

export const usePageInUrl = () => {
  const { search, pathname } = useLocation();

  const history = useHistory();

  const pageInUrl = decodePage(new URLSearchParams(search).get('page'));

  const setPageInUrl = page => {
    const searchUrl = new URLSearchParams(search);
    searchUrl.set('page', encodePage(page));
    const newSearch = `?${searchUrl.toString()}`;
    // add to history (only if a new page is expected)
    // allow next with browser
    if (search !== newSearch)
      history.push({ pathname: pathname, search: newSearch });
  };

  return { pageInUrl, setPageInUrl };
};
