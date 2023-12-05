import { fr } from '@codegouvfr/react-dsfr';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import System from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/system.svg';

export function Authenticating() {
	useDocumentTitle('Page de chargement vers la page de connexion');
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
					<h1>Chargement de la page de connexion au questionnaire</h1>
					<p>
						Vous allez être redirigé vers la page pour vous connecter au
						questionnaire.
					</p>
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
						width="320"
						height="320"
					>
						<use
							className={fr.cx('fr-artwork-decorative')}
							xlinkHref={`${System}#artwork-decorative`}
						></use>
						<use
							className={fr.cx('fr-artwork-minor')}
							xlinkHref={`${System}#artwork-minor`}
						></use>
						<use
							className={fr.cx('fr-artwork-major')}
							xlinkHref={`${System}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
