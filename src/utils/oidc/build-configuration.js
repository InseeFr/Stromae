export const buildOidcConfiguration = ({ oidcConf, conf }) => {
  const { origin } = window.location;
  const { realm, resource } = oidcConf;
  const { portailPromotion } = conf;
  return {
    authority: `${oidcConf['auth-server-url']}/realms/${realm}`,
    client_id: resource,
    redirect_uri: `${origin}/authentication/callback`,
    response_type: 'code',
    post_logout_redirect_uri: `${portailPromotion}/`,
    scope: 'openid profile email',
    silent_redirect_uri: `${origin}/authentication/silent_callback`,
    automaticSilentRenew: true,
    loadUserInfo: true,
  };
};
