import { fr } from '@codegouvfr/react-dsfr/fr';

type Props = {
	label?: string | number | boolean;
};

export function BannerAddress(props: Props) {
	const { label } = props;

	if (!label) {
		return null;
	}
	return (
		<p className={fr.cx('fr-text--bold', 'fr-mr-2w', 'fr-mb-0')}>{label}</p>
	);
}
