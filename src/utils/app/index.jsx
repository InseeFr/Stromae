import packageInfo from '../../../package.json';

export const stromaeVersion = packageInfo.version;
export const lunaticVersion = packageInfo.dependencies[
	'@inseefr/lunatic'
].replace('^', '');
