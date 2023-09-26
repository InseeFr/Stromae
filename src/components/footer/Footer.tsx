import { fr } from '@codegouvfr/react-dsfr/fr';
import ConvertContent from '../../utils/convertContent';

import { FooterType } from './FooterType';
import { Link } from 'react-router-dom';
import { AppVersion } from '../AppVersion/AppVersion';

const DEFAULT_FOOTER: FooterType = {
	brandTop: 'valeur par defaut',
	accessibility: 'fully compliant',
	contentDescription: undefined,
	websiteMapLinkProps: undefined,
	accessibilityLinkProps: undefined,
	otherLinksProps: [],
	termsLinkProps: undefined,
	homeLinkProps: undefined,
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
		otherLinksProps,
		termsLinkProps,
		websiteMapLinkProps,
		license,
		operatorLogo,
	} = props.footer || DEFAULT_FOOTER;
	// We don't use the React DSFR Footer component because the links are not correctly displayed with nvda (the links are all on one line)
	return (
		<footer className={fr.cx('fr-footer')} role="contentinfo" id="footer">
			<div className={fr.cx('fr-container')}>
				<div className={fr.cx('fr-footer__body')}>
					<div className={fr.cx('fr-footer__brand', 'fr-enlarge-link')}>
						<p className={fr.cx('fr-logo')}>
							<ConvertContent content={brandTop as any} />
						</p>
						<Link
							className={fr.cx('fr-footer__brand-link')}
							to="/"
							title={`Accueil - ${
								homeLinkProps && homeLinkProps.title
							} - République Française`}
						>
							<img
								className={fr.cx('fr-footer__logo')}
								style={{ width: '3.5rem' }}
								src={operatorLogo?.imgUrl}
								alt={operatorLogo?.alt}
							/>
						</Link>
					</div>
					<div className={fr.cx('fr-footer__content')}>
						<p className={fr.cx('fr-footer__content-desc')}>
							{contentDescription}
						</p>
						<ul className={fr.cx('fr-footer__content-list')}>
							<li>
								<Link
									className={fr.cx('fr-footer__content-link')}
									target="_blank"
									title="le-recensement-et-moi.fr - ouvre une nouvelle fenêtre"
									to="https://le-recensement-et-moi.fr"
									rel="noreferrer"
								>
									le-recensement-et-moi
								</Link>
								&nbsp;
							</li>
							<li>
								<Link
									title="insee.fr - ouvre une nouvelle fenêtre"
									rel="noreferrer"
									target="_blank"
									className={fr.cx('fr-footer__content-link')}
									to="https://insee.fr"
								>
									insee.fr
								</Link>
								&nbsp;
							</li>
							<li>
								<Link
									className={fr.cx('fr-footer__content-link')}
									target="_blank"
									title="service-public.fr - ouvre une nouvelle fenêtre"
									to="https://service-public.fr"
									rel="noreferrer"
								>
									service-public.fr
								</Link>
								&nbsp;
							</li>
							<li>
								<Link
									target="_blank"
									rel="noreferrer"
									title="data.gouv.fr - ouvre une nouvelle fenêtre"
									className={fr.cx('fr-footer__content-link')}
									to="https://data.gouv.fr"
								>
									data.gouv.fr
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={fr.cx('fr-footer__bottom')}>
					<ul className={fr.cx('fr-footer__bottom-list')}>
						{websiteMapLinkProps && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<Link
									to={websiteMapLinkProps?.to}
									className={fr.cx('fr-footer__bottom-link')}
								>
									Plan du site
								</Link>
								&nbsp;
							</li>
						)}
						{accessibilityLinkProps && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<Link
									className={fr.cx('fr-footer__bottom-link')}
									to={accessibilityLinkProps?.to}
								>
									Accessibilité : {accessibility}
								</Link>
								&nbsp;
							</li>
						)}
						{termsLinkProps && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<Link
									className={fr.cx('fr-footer__bottom-link')}
									to={termsLinkProps?.to}
								>
									Mentions légales
								</Link>
								&nbsp;
							</li>
						)}
						{otherLinksProps?.map((otherLinkProps, key) => (
							<li className={fr.cx('fr-footer__bottom-item')} key={key}>
								<Link
									className={fr.cx('fr-footer__bottom-link')}
									to={otherLinkProps?.to}
								>
									{otherLinkProps?.title}
								</Link>
								&nbsp;
							</li>
						))}
						<li className={fr.cx('fr-footer__bottom-item')}>
							<AppVersion className={fr.cx('fr-footer__bottom-link')} />
						</li>
					</ul>
					<div className={fr.cx('fr-footer__bottom-copy')}>
						<p>
							<ConvertContent content={license as any} />
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
