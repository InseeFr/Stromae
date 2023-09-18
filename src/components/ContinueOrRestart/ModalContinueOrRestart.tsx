import { useRef } from 'react';
import { ModalDsfr } from './ModalDsfr';
import { fr } from '@codegouvfr/react-dsfr/fr';

export function ModalContinueOrRestart(props: {
	onRestart: () => void;
	onContinue: () => void;
	onClose: () => void;
}) {
	const last = useRef<HTMLButtonElement>(null);

	return (
		<ModalDsfr
			id="start-or-continue"
			close={props.onClose}
			last={last.current as HTMLElement}
		>
			<h1 className={fr.cx('fr-modal__title')}>Bienvenue</h1>
			<p>
				Vous avez déjà commencé à renseigner le questionnaire. Souhaitez-vous
				reprendre la vous en étiez ou revenir à la première page ?
			</p>
			<ul className={fr.cx('fr-btns-group', 'fr-btns-group--inline-md')}>
				<li>
					<button
						className={fr.cx('fr-btn', 'fr-btn--secondary')}
						onClick={props.onRestart}
					>
						Revenir à la première page
					</button>
				</li>
				<li>
					<button
						className={fr.cx('fr-btn')}
						onClick={props.onContinue}
						ref={last}
					>
						Reprendre la où j'en étais
					</button>
				</li>
			</ul>
		</ModalDsfr>
	);
}
