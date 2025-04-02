import { ReactNode, useCallback, useContext, useState } from 'react';
import { makeStyles } from '@codegouvfr/react-dsfr/tss';
import { GoToPage } from '../../typeLunatic/type-source';
import {
	ModalDsfr,
	ModalDsfrContent,
	ModalDsfrFooter,
} from '../ContinueOrRestart/ModalDsfr';
import { fr } from '@codegouvfr/react-dsfr';
import { useLunaticContext } from '../orchestrator/UseLunatic';

const useStyles = makeStyles()({
	root: {
		'+ .lunatic-component-with-dsfr': {
			marginBottom: '2rem',
		},
	},
});

type ConfirmationType = {
	goToPage?: GoToPage;
	description: ReactNode;
	label: ReactNode;
};

export function ConfirmationModal(props: ConfirmationType) {
	const { classes, cx } = useStyles();

	const [display, setDisplay] = useState(true);
	const { goToPage, goNextPage } = useContext(useLunaticContext);
	const onClose = useCallback(() => {
		setDisplay(false);
		goToPage?.({ page: '17' });
	}, [goToPage]);

	const confirm = useCallback(() => {
		goNextPage?.();
	}, [goNextPage]);

	if (!display) {
		return null;
	}
	return (
		<div id="stromae-modals" className={cx(classes.root)}>
			<ModalDsfr close={onClose}>
				<ModalDsfrContent>
					<h1 className="fr-modal__title">{props.label}</h1>
					{props.description}
				</ModalDsfrContent>
				<ModalDsfrFooter>
					<ul
						className={fr.cx(
							'fr-btns-group',
							'fr-btns-group--inline-md',
							'fr-btns-group--right'
						)}
					>
						<li>
							<button
								className={fr.cx('fr-btn', 'fr-btn--secondary')}
								onClick={onClose}
							>
								Annuler
							</button>
						</li>
						<li>
							<button className={fr.cx('fr-btn')} onClick={confirm}>
								Je confirme
							</button>
						</li>
					</ul>
				</ModalDsfrFooter>
			</ModalDsfr>
		</div>
	);
}
