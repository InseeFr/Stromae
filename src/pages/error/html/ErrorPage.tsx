import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button } from '@codegouvfr/react-dsfr/Button';
import TechnicalError from '@codegouvfr/react-dsfr/dsfr/artwork/pictograms/system/technical-error.svg';
import { useDocumentTitle } from '../../../utils/useDocumentTitle';
import { fr } from '@codegouvfr/react-dsfr';
import { useContext, useEffect, useMemo, useState } from 'react';
import { loadSourceDataContext } from '../../../components/loadSourceData/LoadSourceDataContext';
import { MetadataSurvey } from '../../../typeStromae/type';
import { useAsyncEffect } from '../../../hooks/useAsyncEffect';

function ErrorStatus({
	errorStatus,
	code,
}: {
	errorStatus: number | false;
	code?: number;
}) {
	if (errorStatus || code) {
		return <span>Erreur {errorStatus ? errorStatus : code}</span>;
	}
	return null;
}

function getTextFor(code?: number, content?: Record<string, string>) {
	const title =
		code && code === 301 ? 'Temporairement indisponible' : 'Page non trouvée';

	const subtitle =
		code && code === 301
			? content?.subtitle ||
			  "La page que vous cherchez n'est pas disponible pour le moment.  Veuillez réessayez ultérieurement."
			: 'La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.';

	const paragraph =
		code && code === 301
			? content?.paragraph
			: 'Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez retourner sur la page d’accueil. Sinon contactez-nous pour que l’on puisse vous aider.';

	return { title, subtitle, paragraph };
}

export function ErrorPage({ code }: { code?: number }) {
	const { getMetadata } = useContext(loadSourceDataContext);
	const [metadata, setMetadata] = useState<MetadataSurvey>();

	const content = useMemo(() => {
		if (metadata?.errorPage) {
			return metadata.errorPage;
		}
		return undefined;
	}, [metadata]);

	const error = useRouteError();
	const errorStatus = isRouteErrorResponse(error) && error.status;

	const { title, subtitle, paragraph } = getTextFor(code, content);

	useEffect(() => {}, [metadata]);

	useAsyncEffect(async () => {
		setMetadata(await getMetadata());
	}, [getMetadata]);

	useDocumentTitle(title);
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
					<h1>{title}</h1>
					<ErrorStatus errorStatus={errorStatus} code={code} />
					<p className={fr.cx('fr-mt-3w', 'fr-text--lead')}>{subtitle}</p>
					<p className={fr.cx('fr-mt-3w')}>{paragraph}</p>
					<Button
						size="large"
						linkProps={{
							to: '/',
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
