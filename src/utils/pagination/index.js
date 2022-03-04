export const WELCOME_PAGE = 'welcomePage';
export const VALIDATION_PAGE = 'validationPage';
export const END_PAGE = 'endPage';

export const isLunaticPage = page => /^\d+(\.\d+#\d+)*$/.test(page);

export const isStromaePage = page =>
  [WELCOME_PAGE, VALIDATION_PAGE, END_PAGE].includes(page);
