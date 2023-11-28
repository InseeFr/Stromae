import { PropsWithChildren, useRef, useCallback } from 'react';
import { useTabulate } from '../../lib/commons/useTabulate';
import { fr } from '@codegouvfr/react-dsfr/fr';

type ModalDsfrProps = {
	id?: string;
	close: () => void;
	last?: HTMLElement;
};

export function ModalDsfr(props: PropsWithChildren<ModalDsfrProps>) {
	const first = useRef<HTMLButtonElement>(null);
	const { children, id, close, last } = props;

	const { onKeyDown } = useTabulate(first.current as HTMLElement, last);

	const onKeyDownExt = useCallback(
		(e: React.KeyboardEvent<HTMLElement>) => {
			if (e.key === 'Escape') {
				close?.();
			} else {
				onKeyDown(e);
			}
		},
		[onKeyDown, close]
	);

	return (
		<div  id={id} className={fr.cx('fr-modal', 'fr-modal--opened')} role='dialog' aria-labelledby="fr-modal-title-modal-1" aria-modal="true">
			<div
				className={fr.cx(
					'fr-container',
					'fr-container--fluid',
					'fr-container-md'
				)}
			>
				<div
					className={fr.cx('fr-grid-row', 'fr-grid-row--center')}
					onKeyDown={onKeyDownExt}
				>
					<div className={fr.cx('fr-col-12', 'fr-col-md-8', 'fr-col-lg-6')}>
						<div className={fr.cx('fr-modal__body')}>
							<div className={fr.cx('fr-modal__header')}>
								<button
									className={fr.cx('fr-link--close', 'fr-link')}
									title="Fermer"
									onClick={close}
									ref={first}
								>
									Fermer
								</button>
							</div>
							<div className={fr.cx('fr-modal__content')}>{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
