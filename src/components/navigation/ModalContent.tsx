import { fr } from '@codegouvfr/react-dsfr';

export function ModalContent() {
	return (
		<div className={fr.cx('fr-modal__content')}>
			<h2 id="fr-modal-title-modal-1" className="fr-modal__title">
				<span className="fr-fi-arrow-right-line fr-fi--lg"></span>
				Titre de la modale
			</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
				tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.
				Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet
				augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor
				pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et
				ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum
				primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu
				turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna
				ac augue cursus tincidunt sit amet sed orci.
			</p>
		</div>
	);
}
