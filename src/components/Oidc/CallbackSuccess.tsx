import { useDocumentTitle } from '../../utils/useDocumentTitle';
import Success from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/success.svg';

export function CallbackSuccess() {
	useDocumentTitle('Page de chargement vers le questionnaire');
	return (
		<div className="fr-container" aria-live="polite" aria-busy="true">
			<div
				className="fr-grid-row fr-grid-row--center fr-grid-row--middle"
				style={{ minHeight: '80vh' }}
			>
				<div className="fr-col-md-6 fr-col-12 fr-col--middle">
					<h1 className="">Authentification réussie.</h1>
					<p>Vous allez être redirigé vers le questionnaire.</p>
				</div>
				<div className="fr-col-lg-3 fr-col-offset-lg-1 fr-col-8 fr-mt-6w fr-col--middle">
					<svg
						className="fr-artwork"
						aria-hidden="true"
						viewBox="0 0 80 80"
						width="240px"
						height="240px"
					>
						<use
							className="fr-artwork-decorative"
							xlinkHref={`${Success}#artwork-decorative`}
						></use>
						<use
							className="fr-artwork-minor"
							xlinkHref={`${Success}#artwork-minor`}
						></use>
						<use
							className="fr-artwork-major"
							xlinkHref={`${Success}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
