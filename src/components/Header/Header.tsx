import { useState, useEffect } from 'react';
import { HeaderType } from './HeaderType';
import { DEFAULT_HEADER } from './default-header';
import ConvertContent from '../../utils/convertContent';
import Button from '@codegouvfr/react-dsfr/Button';
import { fr } from '@codegouvfr/react-dsfr';
import Display from '@codegouvfr/react-dsfr/Display/Display';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconTheme = fr.cx('fr-icon-theme-fill');

function getAuthLabel(isAuthenticated: boolean): string {
	if (isAuthenticated) {
		return 'Me déconnecter';
	}
	return 'Me connecter';
}

export type HeaderProps = {
	header?: HeaderType;
	readonly handleOidcAuth?: () => void;
	isAuthenticated?: boolean;
};

export function Header(props: HeaderProps) {
	const { header, handleOidcAuth, isAuthenticated = false } = props;

	const [brandTop, setBrandTop] = useState(DEFAULT_HEADER.brandTop);
	const [homeLinkProps, setHomeLinkProps] = useState(
		DEFAULT_HEADER.homeLinkProps
	);
	const [serviceTitle, setServiceTitle] = useState(DEFAULT_HEADER.serviceTitle);
	const [operatorLogo, setOperatorLogo] = useState(DEFAULT_HEADER.operatorLogo);
	const [quickAccessItems, setQuickAccessItems] = useState<Array<any>>([]);

	useEffect(() => {
		if (!header) {
			return;
		}
		setBrandTop(header.brandTop || DEFAULT_HEADER.brandTop);
		setHomeLinkProps(header.homeLinkProps || DEFAULT_HEADER.homeLinkProps);
		setServiceTitle(header.serviceTitle || DEFAULT_HEADER.serviceTitle);
		setOperatorLogo(header.operatorLogo || DEFAULT_HEADER.operatorLogo);
	}, [header]);

	useEffect(() => {
		const others = header?.quickAccessItems || [];
		setQuickAccessItems([
			...others,
			{
				iconId: 'fr-icon-lock-line',
				buttonProps: {
					onClick: handleOidcAuth,
				},
				text: getAuthLabel(isAuthenticated),
			},
		]);
	}, [isAuthenticated, handleOidcAuth, header]);

	return (
		<>
			<header role="banner" className={fr.cx('fr-header')} id="header">
				<div>
					<div className={fr.cx('fr-container')}>
						<div className={fr.cx('fr-header__body-row')}>
							<div className={fr.cx('fr-header__brand', 'fr-enlarge-link')}>
								<div className={fr.cx('fr-header__brand-top')}>
									<div className={fr.cx('fr-header__logo')}>
										<p className={fr.cx('fr-logo')}>
											{<ConvertContent content={brandTop as any} />}
										</p>
									</div>
									<div className={fr.cx('fr-header__operator')}>
										<img
											className={fr.cx('fr-responsive-img')}
											style={{ maxWidth: '3.5rem' }}
											src={operatorLogo?.imgUrl}
											alt={operatorLogo?.alt}
										/>
									</div>
									<div className={fr.cx('fr-header__navbar')}>
										<button
											className={fr.cx('fr-btn--menu', 'fr-btn')}
											data-fr-opened="false"
											aria-controls="modal-577"
											aria-haspopup="menu"
											id="button-578"
											title="Menu"
										>
											Menu
										</button>
									</div>
								</div>
								<div className={fr.cx('fr-header__service')}>
									<h1 className={fr.cx('fr-header__service-title')}>
										<a
											href={homeLinkProps.href}
											title={`Accueil - ${homeLinkProps.title} - République Française`}
										>
											{serviceTitle}
										</a>
									</h1>
								</div>
							</div>
							<div className={fr.cx('fr-header__tools')}>
								<div className={fr.cx('fr-header__tools-links')}>
									<ul className={fr.cx('fr-btns-group')}>
										<li>
											<button
												className={fr.cx('fr-btn', 'fr-icon-theme-fill')}
												aria-controls="fr-theme-modal"
												data-fr-opened="false"
											>
												Paramètres d'affichage
											</button>
										</li>
										{quickAccessItems &&
											quickAccessItems.map((quickAccessItem, index) => {
												return (
													<li key={index}>
														{quickAccessItem.buttonProps ? (
															<Button
																iconId={quickAccessItem.iconId}
																onClick={quickAccessItem.buttonProps.onClick}
															>
																{quickAccessItem.text}
															</Button>
														) : (
															<Button
																linkProps={{
																	target: quickAccessItem.linkProps?.target,
																	href: quickAccessItem.linkProps?.href,
																	title:
																		quickAccessItem.linkProps?.target ===
																		'_blank'
																			? `${quickAccessItem.text} - ouvre une nouvelle fenêtre`
																			: quickAccessItem.text,
																}}
															>
																{quickAccessItem.text}
															</Button>
														)}
													</li>
												);
											})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={fr.cx('fr-header__menu', 'fr-modal')}
					id="modal-577"
					aria-labelledby="button-578"
				>
					<div className={fr.cx('fr-container')}>
						<button
							className={fr.cx('fr-btn--close', 'fr-btn')}
							aria-controls="modal-577"
							title="Fermer"
						>
							Fermer
						</button>
						<div className={fr.cx('fr-header__menu-links')}>
							<ul className={fr.cx('fr-btns-group')}>
								<li>
									<button
										className={fr.cx('fr-btn', 'fr-icon-theme-fill')}
										aria-controls="fr-theme-modal"
										data-fr-opened="false"
									>
										Paramètres d'affichage
									</button>
								</li>
								{quickAccessItems &&
									quickAccessItems.map((quickAccessItem, index) => {
										return (
											<li key={index}>
												{quickAccessItem.buttonProps ? (
													<Button
														iconId={quickAccessItem.iconId}
														onClick={quickAccessItem.buttonProps.onClick}
													>
														{quickAccessItem.text}
													</Button>
												) : (
													<Button
														linkProps={{
															target: quickAccessItem.linkProps?.target,
															href: quickAccessItem.linkProps?.href,
															title:
																quickAccessItem.linkProps?.target === '_blank'
																	? `${quickAccessItem.text} - ouvre une nouvelle fenêtre`
																	: quickAccessItem.text,
														}}
													>
														{quickAccessItem.text}
													</Button>
												)}
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				</div>
			</header>
			<Display />
		</>
	);
}
