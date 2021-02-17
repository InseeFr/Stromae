export const OIDC = 'OIDC';
export const NONE = 'NONE';
export const AUTHENTICATION_TYPE_ENUM = [NONE, OIDC];

export const HOUSEHOLD = 'household';
export const BUSINESS = 'business';

export const COOKIE_CONSENT = 'cookie-consent';

export const READ_ONLY = 'readonly';
export const GUEST_USER = {
  lastName: 'Guest',
  firstName: 'Guest',
  id: 'Guest',
  roles: ['Guest'],
};

export const AUTHORIZED_ROLES = ['Guest', 'offline_access'];
export const QUESTIONNAIRE_EXAMPLE_URL = `${window.location.origin}/static/questionnaire/simpsons.json`;
export const METADATA_EXAMPLE_URL = `${window.location.origin}/static/questionnaire/metadata.json`;
export const DATA_EXAMPLE_URL = `${window.location.origin}/static/questionnaire/data.json`;
