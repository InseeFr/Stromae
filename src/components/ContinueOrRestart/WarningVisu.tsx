import { fr } from '@codegouvfr/react-dsfr/fr';
import { useRef, useState } from 'react';
import { ModalDsfr } from './ModalDsfr';

export function ModalWarningVizu() {
	const last = useRef<HTMLButtonElement>(null);

	const [display, setDisplay] = useState(true);

	function onClose() {
		setDisplay(false);
	}

	if (!display) {
		return null;
	}

	return (
		<ModalDsfr
			id="start-or-continue"
			close={onClose}
			last={last.current as HTMLElement}
		>
			<h1 className={fr.cx('fr-modal__title')} id="fr-modal-title-modal-1">
				Bienvenue
			</h1>
			<p>
				Vous visualisez actuellement votre questionnaire sur une plateforme
				"beta".
			</p>

			<section className={fr.cx('fr-accordion')}>
				<h3 className={fr.cx('fr-accordion__title')}>
					<button
						className={fr.cx('fr-accordion__btn')}
						aria-expanded="false"
						aria-controls="accordion-106"
					>
						En savoir plus
					</button>
				</h3>
				<div className={fr.cx('fr-collapse')} id="accordion-106">
					<p>
						Pour des raisons techniques, certaines fonctionnalités, comme les
						déclarations après le libellé des questions ont été désactivées.
					</p>
					<p>
						Ces fonctionnalités sont en cours de révision par l'atelier de
						conception, elles reviendront prochainement.
					</p>
				</div>
			</section>
			<br />

			<p>Merci de votre compréhension.</p>

			<ul className={fr.cx('fr-btns-group', 'fr-btns-group--inline-md')}>
				<li>
					<button className={fr.cx('fr-btn')} onClick={onClose} ref={last}>
						J'ai compris
					</button>
				</li>
			</ul>
		</ModalDsfr>
	);
}
