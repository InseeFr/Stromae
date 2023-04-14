import { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { useTabulate } from '../../lib/commons/useTabulate';

type ModalDsfrProps = {
	id?: string;
	close: () => void;
	last?: HTMLElement;
};

export function ModalDsfr(props: PropsWithChildren<ModalDsfrProps>) {
	const first = useRef<HTMLButtonElement>(null);
	const { children, id, close, last } = props;

	const { onKeyDown } = useTabulate(first.current as HTMLElement, last);

	return (
		<dialog id={id} className={fr.cx('fr-modal', 'fr-modal--opened')}>
			<div
				className={fr.cx(
					'fr-container',
					'fr-container--fluid',
					'fr-container-md'
				)}
			>
				<div
					className={fr.cx('fr-grid-row', 'fr-grid-row--center')}
					onKeyDown={onKeyDown}
				>
					<div className={fr.cx('fr-col-12', 'fr-col-md-8', 'fr-col-lg-6')}>
						<div className={fr.cx('fr-modal__body')}>
							<div className={fr.cx('fr-modal__header')}>
								<button
									className={fr.cx('fr-btn', 'fr-btn--tertiary-no-outline')}
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
		</dialog>
	);
}
