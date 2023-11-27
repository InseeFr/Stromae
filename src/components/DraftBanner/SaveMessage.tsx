import { fr } from '@codegouvfr/react-dsfr';

type Props = {
	saved: boolean;
};

export function SaveMessage(props: Props) {
	const { saved } = props;

	// The saved flag is set to a timer, which returns to false after 2 seconds
	if (saved) {
		return (
			<span
				className={fr.cx('fr-col-12', 'fr-col-md-10')}
				aria-live="polite"
			>
				<i
					className={fr.cx(
						'fr-icon-checkbox-circle-fill',
						'fr-label--success',
						'fr-mr-1v'
					)}
					aria-hidden="true"
				/>
				Brouillon enregistré.
			</span>
		);
	}
	return (
		<p className={fr.cx('fr-col-12', 'fr-col-md-10', 'fr-mb-0')}>
			Vos réponses sont enregistrées automatiquement à chaque chargement de
			page.
		</p>
	);
}
