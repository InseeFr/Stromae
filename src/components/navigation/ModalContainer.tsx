import { PropsWithChildren } from 'react';

type ModalContainerType = {};

export function ModalContainer(props: PropsWithChildren<ModalContainerType>) {
	const { children } = props;

	return (
		<dialog
			aria-labelledby="fr-modal-title-modal-1"
			id="fr-modal-1"
			className="fr-modal fr-modal--opened"
		>
			<div className="fr-container fr-container--fluid fr-container-md">
				<div className="fr-grid-row fr-grid-row--center">
					<div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
						<div className="fr-modal__body">{children}</div>
					</div>
				</div>
			</div>
		</dialog>
	);
}
