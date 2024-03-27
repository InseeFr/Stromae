import { lunaticVersion, stromaeVersion } from '../../utils/app/index';

export const AppVersion = ({ className, appSupplementaire }) => {
	return (
		<span
			className={className}
		>{`Stromae : ${stromaeVersion} | Lunatic : ${lunaticVersion}${appSupplementaire === undefined ? "" : appSupplementaire}`}</span>
	);
};
