import { Button } from '@codegouvfr/react-dsfr/Button';
import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup';
import { fr } from '@codegouvfr/react-dsfr';

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
	if (display) {
		return (
			<dialog id="fr-modal-1" className={fr.cx('fr-modal', 'fr-modal--opened')}>
				<div
					className={fr.cx(
						'fr-container',
						'fr-container--fluid',
						'fr-container-md'
					)}
				>
					<div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
						<div className={fr.cx('fr-col-12', 'fr-col-md-8', 'fr-col-lg-6')}>
							<div className={fr.cx('fr-modal__body')}>
								<div className={fr.cx('fr-modal__header')}>
									<Button
										className={fr.cx('fr-link--close', 'fr-link')}
										onClick={close}
										priority="tertiary no outline"
									>
										Fermer
									</Button>
								</div>
								<div className="fr-modal__content">
									<h1 className={fr.cx('fr-modal__title')}>Bienvenue</h1>
									<p>
										Vous avez déjà commencé à renseigner le questionnaire.
										Souhaitez-vous reprendre la vous en étiez ou revenir à la
										première page ?
									</p>
									<ButtonsGroup
										buttons={[
											{
												children: 'Revenir à la première page',
												nativeButtonProps: {
													onClick: () => {
														goToPage({ page: '1', iteration });
														close();
													},
												},
												priority: 'secondary',
											},
											{
												children: 'Reprendre là où j’en étais',
												nativeButtonProps: {
													onClick: () => {
														goToPage({ page: currentPage, iteration });
														close();
													},
												},
												priority: 'primary',
											},
										]}
										alignment="right"
										inlineLayoutWhen="md and up"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		);
	}
	return null;
}
