import { useDocumentTitle } from '../../utils/useDocumentTitle';
import Information from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/information.svg';
import { fr } from '@codegouvfr/react-dsfr';

export function SessionLost() {
	useDocumentTitle("Page d'authentification avec un navigateur non supporté");
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
				<div className={fr.cx('fr-col-md-6', 'fr-col-12')}>
					<h1 className="">Vous avez été déconnecté.</h1>
					<p className={fr.cx('fr-mt-3w', 'fr-text--lead')}>
						Vos réponses ont été sauvegardées, vous pourrez ainsi compléter
						ultèrieurement votre questionnaire.
					</p>
					<a href='/' className="fr-btn"
					>
						Se reconnecter
					</a>
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
							xlinkHref={`${Information}#artwork-decorative`}
						></use>
						<use
							className={fr.cx('fr-artwork-minor')}
							xlinkHref={`${Information}#artwork-minor`}
						></use>
						<use
							className={fr.cx('fr-artwork-major')}
							xlinkHref={`${Information}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
