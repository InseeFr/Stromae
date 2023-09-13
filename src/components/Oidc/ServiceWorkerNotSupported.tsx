import { useDocumentTitle } from '../../utils/useDocumentTitle';
import System from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/system.svg';

export function ServiceWorkerNotSupported() {
	useDocumentTitle("Page d'authentification avec un navigateur non supporté");
	return (
		<div className="fr-container" aria-live="polite" aria-busy="true">
			<div
				className="fr-grid-row fr-grid-row--center fr-grid-row--middle"
				style={{ minHeight: '80vh' }}
			>
				<div className="fr-col-md-6 fr-col-12">
					<h1 className="">
						Vous ne pouvez pas vous connecter au questionnaire avec ce
						navigateur.
					</h1>
					<p>
						Votre navigateur n'est pas sécurisé. Veuillez le mettre à jour ou
						utiliser un navigateur plus récent.
					</p>
				</div>
				<div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-8 fr-mt-6w fr-col--middle">
					<svg
						className="fr-artwork"
						aria-hidden="true"
						viewBox="0 0 80 80"
						width="320px"
						height="320px"
					>
						<use
							className="fr-artwork-decorative"
							xlinkHref={`${System}#artwork-decorative`}
						></use>
						<use
							className="fr-artwork-minor"
							xlinkHref={`${System}#artwork-minor`}
						></use>
						<use
							className="fr-artwork-major"
							xlinkHref={`${System}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
