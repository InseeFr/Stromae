import { useRef } from 'react';
import { fr } from '@codegouvfr/react-dsfr';

import { ModalDsfr } from './ModalDsfr';

export function ModalContinueOrRestart(props: {
	display: boolean;
	currentPage: string;
	close: () => void;
	iteration?: number;
	goToPage?: (page: { page: string; iteration?: number }) => void;
}) {
	const {
		display,
		close,
		goToPage = () => null,
		currentPage,
		iteration,
	} = props;

	const last = useRef<HTMLButtonElement>(null);

	function continu() {
		goToPage({ page: currentPage, iteration });
		close();
	}

	function restart() {
		goToPage({ page: '1', iteration });
		close();
	}

	if (display) {
		return (
			<ModalDsfr
				id="start-or-continue"
				close={close}
				last={last.current as HTMLElement}
			>
				<h1 className={fr.cx('fr-modal__title')}>Bienvenue</h1>
				<p>
					Vous avez déjà commencé à renseigner le questionnaire. Souhaitez-vous
					reprendre la vous en étiez ou revenir à la première page ?
				</p>
				<ul className="fr-btns-group fr-btns-group--inline-md">
					<li>
						<button className="fr-btn fr-btn--secondary" onClick={restart}>
							Revenir à la première page
						</button>
					</li>
					<li>
						<button className="fr-btn" onClick={continu} ref={last}>
							Reprendre la où j'en était
						</button>
					</li>
				</ul>
			</ModalDsfr>
		);
	}
	return null;
}
