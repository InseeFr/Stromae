import Keycloak from 'keycloak-js';

const getCurrentSurvey = path => {
  const temp = path.split('/questionnaire/');
  if (temp.length > 1) {
    const idQ = temp[1].slice(0, temp[1].indexOf('/'));
    const survey = idQ.substr(0, idQ.indexOf('2')).toLowerCase();
    return survey;
  }
  return '';
};

export const createKeycloakOidcClient = async ({
  url,
  realm,
  clientId,
  urlPortail,
}) => {
  const keycloakInstance = Keycloak({ url, realm, clientId });

  const isAuthenticated = await keycloakInstance
    .init({
      onLoad: 'check-sso', //check-sso
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-sso.html`,
      checkLoginIframe: false,
    })
    .catch(error => error);

  const login = async () => {
    await keycloakInstance.login({ redirectUri: window.location.href });
    return new Promise(() => {});
  };

  if (!isAuthenticated) {
    return {
      isUserLoggedIn: false,
      login,
    };
  }

  return {
    isUserLoggedIn: true,
    getAccessToken: async () => {
      // If the token is still valid for 10 seconds we just return the token
      if (!keycloakInstance.isTokenExpired(10)) {
        return keycloakInstance.token;
      }

      // If not, we try to update Token now with refresh token. If the refresh token is expired, that return an error which lead to login page.
      const error = await keycloakInstance.updateToken(-1).then(
        () => undefined,
        error => error
      );

      if (error) {
        //NOTE: Never resolves
        await login();
      }
      return keycloakInstance.token;
    },

    logout: async ({ redirectTo }) => {
      await keycloakInstance.logout({
        redirectUri: (() => {
          switch (redirectTo) {
            case 'portail':
              return `${urlPortail}/${getCurrentSurvey(window.location.href)}`;
            case 'home':
              return window.location.origin;
            default:
              return urlPortail;
          }
        })(),
      });

      return new Promise(() => {});
    },
    /* 
    * Return a Promise with user Info as bellow
      { "sub": session_state",
        "email_verified": true,
        "name": First + last name,
        "preferred_username": username,
        "given_name": first name ,
        "family_name": last name,
        "email": email
      }
    */
    oidcUser: await keycloakInstance.loadUserInfo(), ///
  };
};
