const LAST_SURVEY = 'last-survey';

const getCurrentSurvey = path => {
  if (!path.startsWith('/authentication')) {
    const temp = path.split('/questionnaire/');
    if (temp.length > 1) {
      const survey = temp[1].slice(0, temp[1].indexOf('/'));
      window.localStorage.setItem(LAST_SURVEY, survey);
      return survey;
    }
    return '';
  }
  return window.localStorage.getItem(LAST_SURVEY) || '';
};

const getKc_idp_hintActive = path => {
  if (!path.startsWith('/read-only')) {
    return '';
  }
  return '{"kc_idp_hint":"sso-insee"}';
};

export const buildOidcConfiguration = ({ oidcConf, conf }) => {
  const { origin, pathname } = window.location;
  const { portail } = conf;
  const config = {
    ...oidcConf,
    redirect_uri: `${origin}/authentication/callback`,
    response_type: 'code',
    post_logout_redirect_uri: `${portail}/${getCurrentSurvey(pathname)}`,
    silent_redirect_uri: `${origin}/authentication/silent_callback`,
    extraQueryParams: `${getKc_idp_hintActive(pathname)}`,
  };
  return config;
};
