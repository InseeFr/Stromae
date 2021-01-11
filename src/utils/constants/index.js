export const OIDC = 'OIDC';
export const NONE = 'NONE';
export const AUTHENTICATION_TYPE_ENUM = [NONE, OIDC];

export const READ_ONLY = 'readonly';
export const GUEST_USER = {
  lastName: 'Guest',
  firstName: 'Guest',
  id: 'Guest',
  roles: ['Guest'],
};

export const AUTHORIZED_ROLES = ['Guest', 'offline_access'];

export const JSON_UTF8_HEADER = 'application/json;charset=utf-8';

export const QUESTIONNAIRE_EXAMPLE_URL = `${window.location.origin}/static/questionnaire/simpsons.json`;
