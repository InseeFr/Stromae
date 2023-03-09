type ModalHeaderTypr = {
	onClose: () => void;
};

export function ModalHeader(props: ModalHeaderTypr) {
	const { onClose } = props;
	return (
		<div className="fr-modal__header">
			<button
				className="fr-link--close fr-link"
				title="Fermer la fenêtre modale"
				aria-controls="fr-modal-1"
				onClick={onClose}
			>
				Fermer
			</button>
		</div>
	);
}
