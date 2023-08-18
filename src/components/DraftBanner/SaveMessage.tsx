import { fr } from "@codegouvfr/react-dsfr";

type Props = {
	saved: boolean;
}

export function SaveMessage(props: Props) {
	const {saved} = props;

	if (saved) {
		return (
			<span><i className="fr-icon-checkbox-circle-fill fr-label--success fr-mr-1v" />Brouillon enregistré.</span>
		)
	}
	return (
		<span className={fr.cx('fr-col-12', 'fr-col-md-10')}>Vos réponses sont enregistrées automatiquement à chaque chargement de page.</span>
	)
}
