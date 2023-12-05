import { fr } from '@codegouvfr/react-dsfr';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import Success from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/success.svg';

export function CallbackSuccess() {
	useDocumentTitle('Page de chargement vers le questionnaire');
	return (
		<div className={fr.cx('fr-container')} aria-live="polite" aria-busy="true">
			<div
				className={fr.cx(
					'fr-grid-row',
					'fr-grid-row--center',
					'fr-grid-row--middle'
				)}
				style={{ minHeight: '80vh' }}
			>
				<div className={fr.cx('fr-col-md-6', 'fr-col-12', 'fr-col--middle')}>
					<h1 className="">Authentification réussie.</h1>
					<p>Vous allez être redirigé vers le questionnaire.</p>
				</div>
				<div
					className={fr.cx(
						'fr-col-lg-3',
						'fr-col-offset-lg-1',
						'fr-col-12',
						'fr-mt-6w',
						'fr-col--middle'
					)}
				>
					<svg
						className={fr.cx('fr-artwork')}
						aria-hidden="true"
						viewBox="0 0 80 80"
						width="240"
						height="240"
					>
						<use
							className={fr.cx('fr-artwork-decorative')}
							xlinkHref={`${Success}#artwork-decorative`}
						></use>
						<use
							className={fr.cx('fr-artwork-minor')}
							xlinkHref={`${Success}#artwork-minor`}
						></use>
						<use
							className={fr.cx('fr-artwork-major')}
							xlinkHref={`${Success}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
