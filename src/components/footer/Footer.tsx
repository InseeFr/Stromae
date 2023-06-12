import ConvertContent from '../../utils/convertContent';

import { FooterType } from './FooterType';

const DEFAULT_FOOTER: FooterType = {
	brandTop: 'valeur par defaut',
	accessibility: 'fully compliant',
	contentDescription: undefined,
	websiteMapLinkProps: undefined,
	accessibilityLinkProps: undefined,
	termsLinkProps: undefined,
	personalDataLinkProps: undefined,
	homeLinkProps: {
		href: '/',
		title: 'Accueil',
	},
	// bottomItems: undefined,
	license: undefined,
	operatorLogo: undefined,
};

type FooterProps = { footer?: FooterType };

export function Footer(props: FooterProps) {
	const {
		brandTop,
		accessibility,
		accessibilityLinkProps,
		homeLinkProps,
		contentDescription,
		personalDataLinkProps,
		termsLinkProps,
		websiteMapLinkProps,
		// bottomItems,
		license,
		operatorLogo,
	} = props.footer || DEFAULT_FOOTER;

	return (
		<footer className="fr-footer" role="contentinfo" id="footer">
			<div className="fr-container">
				<div className="fr-footer__body">
					<div className="fr-footer__brand fr-enlarge-link">
						<p className="fr-logo">
							<ConvertContent content={brandTop as any} />
						</p>
						<a
							className="fr-footer__brand-link"
							href={homeLinkProps.href}
							title={`Accueil - ${homeLinkProps.title} - République Française`}
						>
							<img
								className="fr-footer__logo"
								style={{ width: '3.5rem' }}
								src={operatorLogo?.imgUrl}
								alt={operatorLogo?.alt}
							/>
						</a>
					</div>
					<div className="fr-footer__content">
						<p className="fr-footer__content-desc">{contentDescription}</p>
						<ul className="fr-footer__content-list">
							<li className="fr-footer__content-item">
								<a
									className="fr-footer__content-link"
									target="_blank"
									href="https://le-recensement-et-moi.fr"
									rel="noreferrer"
								>
									le-recensement-et-moi
								</a>
								&nbsp;
							</li>
							<li className="fr-footer__content-item">
								<a
									className="fr-footer__content-link"
									target="_blank"
									href="https://insee.fr"
									rel="noreferrer"
								>
									insee.fr
								</a>
								&nbsp;
							</li>
							<li className="fr-footer__content-item">
								<a
									className="fr-footer__content-link"
									target="_blank"
									href="https://service-public.fr"
									rel="noreferrer"
								>
									service-public.fr
								</a>
								&nbsp;
							</li>
							<li className="fr-footer__content-item">
								<a
									className="fr-footer__content-link"
									target="_blank"
									href="https://data.gouv.fr"
									rel="noreferrer"
								>
									data.gouv.fr
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="fr-footer__bottom">
					<ul className="fr-footer__bottom-list">
						{websiteMapLinkProps && (
							<li className="fr-footer__bottom-item">
								<a
									className="fr-footer__bottom-link"
									href={websiteMapLinkProps?.href}
								>
									Plan du site
								</a>
								&nbsp;
							</li>
						)}
						{accessibility && (
							<li className="fr-footer__bottom-item">
								<a
									className="fr-footer__bottom-link"
									href={accessibilityLinkProps?.href}
								>
									Accessibilité : {accessibility}
								</a>
								&nbsp;
							</li>
						)}
						{termsLinkProps && (
							<li className="fr-footer__bottom-item">
								<a
									className="fr-footer__bottom-link"
									href={termsLinkProps?.href}
								>
									Mentions légales
								</a>
								&nbsp;
							</li>
						)}
						{personalDataLinkProps && (
							<li className="fr-footer__bottom-item">
								<a
									className="fr-footer__bottom-link"
									href={personalDataLinkProps?.href}
								>
									Données personnelles
								</a>
							</li>
						)}
					</ul>
					<div className="fr-footer__bottom-copy">
						<p>
							<ConvertContent content={license as any} />
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
