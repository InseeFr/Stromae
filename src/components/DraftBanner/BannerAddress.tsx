import { fr } from '@codegouvfr/react-dsfr/fr';

type Props = {
	label?: string | number | boolean;
};

export function BannerAddress(props: Props) {
	const { label } = props;

	if (!label) {
		return null;
	}
	return <span className={fr.cx('fr-text--bold', 'fr-mr-2w')}>{label}</span>;
}
