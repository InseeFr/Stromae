import { lunaticVersion, stromaeVersion } from '../../utils/app/index';

export const AppVersion = ({ className }) => {
	return (
		<span
			className={className}
		>{`Stromae : ${stromaeVersion} | Lunatic : ${lunaticVersion}`}</span>
	);
};
