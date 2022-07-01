import Keycloak from 'keycloak-js';

const getCurrentSurvey = path => {
  const temp = path.split('/questionnaire/');
  if (temp.length > 1) {
    const idQ = temp[1].slice(0, temp[1].indexOf('/'));
    return idQ.substr(0, idQ.indexOf('2')).toLowerCase();
  }
  return '';
};

export const createKeycloakOidcClient = async ({
  url,
  realm,
  clientId,
  urlPortail,
  evtUserActivity,
}) => {
  const keycloakInstance = Keycloak({ url, realm, clientId });

  const isAuthenticated = await keycloakInstance
    .init({
      onLoad: 'check-sso',
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

  const oidcClient = {
    isUserLoggedIn: true,
    accessToken: keycloakInstance.token,
    oidcUser: await keycloakInstance.loadUserInfo(),
    logout: async redirectTo => {
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
  };

  (function callee() {
    const msBeforeExpiration =
      keycloakInstance.tokenParsed.exp * 1000 - Date.now();

    setTimeout(async () => {
      console.log(
        `OIDC access token will expire in ${minValiditySecond} seconds, waiting for user activity before renewing`
      );

      await evtUserActivity();

      console.log('User activity detected. Refreshing access token now');

      const error = await keycloakInstance.updateToken(-1).then(
        () => undefined,
        error => error
      );

      if (error) {
        console.log("Can't refresh OIDC access token, getting a new one");
        //NOTE: Never resolves
        await login();
      }

      oidcClient.accessToken = keycloakInstance.token;

      callee();
    }, msBeforeExpiration - minValiditySecond * 1000);
  })();

  return oidcClient;
};

const minValiditySecond = 25;
