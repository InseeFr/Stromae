import { version, dependencies } from '../../../package.json';
export const stromaeVersion = version;
export const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '');
