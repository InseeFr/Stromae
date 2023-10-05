import content from '../../resources/content.json';

export const getContent = (context) => content[context];

export const getMenu = (context) => getContent(context)?.menu || {};

/* Generic pages */
export const getGenericPages = (context) => getContent(context)?.genericPages;

export const getWelcomePage = (context) =>
  getGenericPages(context)?.welcome || {};
export const getValidationPage = (context) =>
  getGenericPages(context)?.validation || {};
export const getEndPage = (context) => getGenericPages(context)?.end || {};
