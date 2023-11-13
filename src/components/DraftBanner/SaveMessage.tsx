import { fr } from '@codegouvfr/react-dsfr';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';

type Props = {
	saved: boolean;
};

const useStyles = makeStyles()({
	root: {
		opacity: 0,
		transition: 'opacity ease-in-out 2s',
	},
});

export function SaveMessage(props: Props) {
	const { saved } = props;
	const { classes, cx } = useStyles();
	// The saved flag is set to a timer, which returns to false after 2 seconds
	if (saved) {
		return (
			<span
				className={cx(classes.root, fr.cx('fr-col-12', 'fr-col-md-10'))}
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
