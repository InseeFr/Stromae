import { fr } from '@codegouvfr/react-dsfr';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { PropsWithChildren } from 'react';
import { OrchestratedElement } from '../../typeStromae/type';
import { CloneElements } from '../orchestrator/CloneElements';

const useStyles = makeStyles()({
	container: {
		'> .form-grid': {
			marginBottom: '2.5rem',
			marginTop: '2.5rem',
		},
		':has(+ #complementary-components) > .form-grid': {
			marginBottom: '1rem',
		},
	},
});

export function Grid(props: PropsWithChildren<OrchestratedElement>) {
	const { children, ...rest } = props;
	const { classes, cx } = useStyles();
	return (
		<div className={cx(fr.cx('fr-col-12'), classes.container)}>
			<div className={cx(fr.cx('fr-container'), classes.container)}>
				<div
					className={cx(
						'form-grid',
						fr.cx('fr-grid-row', 'fr-grid-row--center', 'fr-grid-row--middle')
					)}
				>
					<div className={fr.cx('fr-col-lg-6', 'fr-col-md-9', 'fr-col-12')}>
						<CloneElements<OrchestratedElement> {...rest}>
							{children}
						</CloneElements>
					</div>
				</div>
			</div>
		</div>
	);
}
