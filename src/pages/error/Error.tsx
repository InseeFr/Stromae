import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import TechnicalError from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { fr } from '@codegouvfr/react-dsfr';

export function Error() {
	const error = useRouteError();
	const errorStatus = isRouteErrorResponse(error) && error.status;
	useDocumentTitle('Page non trouvée');
	return (
		<div className={fr.cx('fr-container')}>
			<div
				className={fr.cx(
					'fr-grid-row',
					'fr-grid-row--center',
					'fr-grid-row--middle',
					'fr-mt-6w',
					'fr-mt-md-12w'
				)}
			>
				<div className={fr.cx('fr-col-lg-6', 'fr-col-12')}>
					<h1>Page non trouvée</h1>
					{errorStatus && <span>Erreur {errorStatus}</span>}
					<p className={fr.cx('fr-mt-3w', 'fr-text--lead')}>
						La page que vous cherchez est introuvable. Excusez-nous pour la gêne
						occasionnée.
					</p>
					<p className={fr.cx('fr-mt-3w')}>
						Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle
						est correcte. La page n’est peut-être plus disponible. Dans ce cas,
						pour continuer votre visite vous pouvez retourner sur la page
						d’accueil. Sinon contactez-nous pour que l’on puisse vous aider.
					</p>
					<Button
						size="large"
						linkProps={{
							href: '/',
						}}
					>
						Retourner à la page d'accueil
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
						width="200px"
						height="200px"
					>
						<use
							className={fr.cx('fr-artwork-decorative')}
							xlinkHref={`${TechnicalError}#artwork-decorative`}
						></use>
						<use
							className={fr.cx('fr-artwork-minor')}
							xlinkHref={`${TechnicalError}#artwork-minor`}
						></use>
						<use
							className={fr.cx('fr-artwork-major')}
							xlinkHref={`${TechnicalError}#artwork-major`}
						></use>
					</svg>
				</div>
			</div>
		</div>
	);
}
