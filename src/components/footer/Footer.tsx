import { fr } from '@codegouvfr/react-dsfr/fr';
import ConvertContent from '../../utils/convertContent';

import { FooterType } from './FooterType';

const DEFAULT_FOOTER: FooterType = {
	brandTop: 'valeur par defaut',
	accessibility: 'fully compliant',
	contentDescription: undefined,
	websiteMapLinkProps: undefined,
	accessibilityLinkProps: undefined,
	otherLinksProps: [],
	termsLinkProps: undefined,
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
		otherLinksProps,
		termsLinkProps,
		websiteMapLinkProps,
		// bottomItems,
		license,
		operatorLogo,
	} = props.footer || DEFAULT_FOOTER;

	return (
		<footer className={fr.cx('fr-footer')} role="contentinfo" id="footer">
			<div className={fr.cx('fr-container')}>
				<div className={fr.cx('fr-footer__body')}>
					<div className={fr.cx('fr-footer__brand', 'fr-enlarge-link')}>
						<p className={fr.cx('fr-logo')}>
							<ConvertContent content={brandTop as any} />
						</p>
						<a
							className={fr.cx('fr-footer__brand-link')}
							href={homeLinkProps && homeLinkProps.href}
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
						</a>
					</div>
					<div className={fr.cx('fr-footer__content')}>
						<p className={fr.cx('fr-footer__content-desc')}>
							{contentDescription}
						</p>
						<ul className={fr.cx('fr-footer__content-list')}>
							<li>
								<a
									className={fr.cx('fr-footer__content-link')}
									target="_blank"
									href="https://le-recensement-et-moi.fr"
									rel="noreferrer"
								>
									le-recensement-et-moi
								</a>
								&nbsp;
							</li>
							<li>
								<a
									className={fr.cx('fr-footer__content-link')}
									target="_blank"
									href="https://insee.fr"
									rel="noreferrer"
								>
									insee.fr
								</a>
								&nbsp;
							</li>
							<li>
								<a
									className={fr.cx('fr-footer__content-link')}
									target="_blank"
									href="https://service-public.fr"
									rel="noreferrer"
								>
									service-public.fr
								</a>
								&nbsp;
							</li>
							<li>
								<a
									className={fr.cx('fr-footer__content-link')}
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
				<div className={fr.cx('fr-footer__bottom')}>
					<ul className={fr.cx('fr-footer__bottom-list')}>
						{websiteMapLinkProps && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<a
									className={fr.cx('fr-footer__bottom-link')}
									href={websiteMapLinkProps?.href}
								>
									Plan du site
								</a>
								&nbsp;
							</li>
						)}
						{accessibility && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<a
									className={fr.cx('fr-footer__bottom-link')}
									href={accessibilityLinkProps?.href}
								>
									Accessibilité : {accessibility}
								</a>
								&nbsp;
							</li>
						)}
						{termsLinkProps && (
							<li className={fr.cx('fr-footer__bottom-item')}>
								<a
									className={fr.cx('fr-footer__bottom-link')}
									href={termsLinkProps?.href}
								>
									Mentions légales
								</a>
								&nbsp;
							</li>
						)}
						{otherLinksProps?.map((otherLinkProps, key) => (
							<li className={fr.cx('fr-footer__bottom-item')} key={key}>
								<a
									className={fr.cx('fr-footer__bottom-link')}
									href={otherLinkProps?.href}
								>
									{otherLinkProps?.title}
								</a>
								&nbsp;
							</li>
						))}
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
