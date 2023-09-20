import { useDocumentTitle } from '../../utils/useDocumentTitle';
import Error from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/error.svg';
import Button from '@codegouvfr/react-dsfr/Button';
import { fr } from '@codegouvfr/react-dsfr';

export function AuthenticatingError() {
	useDocumentTitle("Page d'échec d'authentification");
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
					<h1 className="">Echec de l'authentification.</h1>
					<p>
						Une erreur s'est produite pendant votre authentification. Veuillez
						réessayer de vous connecter au questionnaire.
					</p>
					<Button
						size="large"
						linkProps={{
							to: '/',
						}}
					>
						Se reconnecter
					</Button>
				</div>
				<div
					className={fr.cx(
						'fr-col-lg-3',
						'fr-col-offset-lg-1',
						'fr-col-8',
						'fr-mt-6w',
						'fr-col--middle'
					)}
				>
					<svg
						className={fr.cx('fr-artwork')}
						aria-hidden="true"
						viewBox="0 0 80 80"
						width="320px"
						height="320px"
					>
						<use
							className={fr.cx('fr-artwork-decorative')}
							xlinkHref={`${Error}#artwork-decorative`}
						></use>
						<use
							className={fr.cx('fr-artwork-minor')}
							xlinkHref={`${Error}#artwork-minor`}
						></use>
						<use
							className={fr.cx('fr-artwork-major')}
							xlinkHref={`${Error}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
