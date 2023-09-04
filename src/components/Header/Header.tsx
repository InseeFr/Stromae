import { useState, useEffect } from 'react';
import { HeaderType } from './HeaderType';
import { DEFAULT_HEADER } from './default-header';
import ConvertContent from '../../utils/convertContent';
import Button from '@codegouvfr/react-dsfr/Button';
import { fr } from '@codegouvfr/react-dsfr';

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
			<header role="banner" className="fr-header" id="header">
				<div className="fr-header__body">
					<div className="fr-container">
						<div className="fr-header__body-row">
							<div className="fr-header__brand fr-enlarge-link">
								<div className="fr-header__brand-top">
									<div className="fr-header__logo">
										<p className="fr-logo">
											{<ConvertContent content={brandTop as any} />}
										</p>
									</div>
									<div className="fr-header__operator">
										<img
											className="fr-responsive-img"
											style={{ maxWidth: '3.5rem' }}
											src={operatorLogo?.imgUrl}
											alt={operatorLogo?.alt}
										/>
									</div>
									<div className="fr-header__navbar">
										<button
											className="fr-btn--menu fr-btn"
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
								<div className="fr-header__service">
									<h1 className="fr-header__service-title">
										<a
											href={homeLinkProps.href}
											title={`Accueil - ${homeLinkProps.title} - République Française`}
										>
											{serviceTitle}
										</a>
									</h1>
								</div>
							</div>
							<div className="fr-header__tools">
								<div className="fr-header__tools-links">
									<ul className="fr-btns-group">
										<li>
											<button
												className="fr-btn fr-icon-theme-fill"
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
					className="fr-header__menu fr-modal"
					id="modal-577"
					aria-labelledby="button-578"
				>
					<div className="fr-container">
						<button
							className="fr-btn--close fr-btn"
							aria-controls="modal-577"
							title="Fermer"
						>
							Fermer
						</button>
						<div className="fr-header__menu-links">
							<ul className="fr-btns-group">
								<li>
									<button
										className="fr-btn fr-icon-theme-fill"
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
			<dialog
				id="fr-theme-modal"
				className="fr-modal"
				aria-labelledby="fr-theme-modal-title"
			>
				<div className="fr-container fr-container--fluid fr-container-md">
					<div className="fr-grid-row fr-grid-row--center">
						<div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
							<div className="fr-modal__body">
								<div className="fr-modal__header">
									<button
										className="fr-btn--close fr-btn"
										aria-controls="fr-theme-modal"
										id="button-5622"
										title="Fermer"
									>
										Fermer
									</button>
								</div>
								<div className="fr-modal__content">
									<h1 id="fr-theme-modal-title" className="fr-modal__title">
										Paramètres d’affichage
									</h1>
									<div id="fr-display" className="fr-display">
										<fieldset className="fr-fieldset" id="display-fieldset">
											<legend
												className="fr-fieldset__legend--regular fr-fieldset__legend"
												id="display-fieldset-legend"
											>
												Choisissez un thème pour personnaliser l’apparence du
												site.
											</legend>
											<div className="fr-fieldset__element">
												<div className="fr-radio-group fr-radio-rich">
													<input
														value="light"
														type="radio"
														id="fr-radios-theme-light"
														name="fr-radios-theme"
													/>
													<label
														className="fr-label"
														htmlFor="fr-radios-theme-light"
													>
														Thème clair
													</label>
													<div className="fr-radio-rich__img">
														<svg
															aria-hidden="true"
															className="fr-artwork"
															viewBox="0 0 80 80"
															width="80px"
															height="80px"
														>
															<use
																className="fr-artwork-decorative"
																href="/img/artwork/pictograms/environment/sun.svg#artwork-decorative"
															></use>
															s
															<use
																className="fr-artwork-minor"
																href="/img/artwork/pictograms/environment/sun.svg#artwork-minor"
															></use>
															<use
																className="fr-artwork-major"
																href="/img/artwork/pictograms/environment/sun.svg#artwork-major"
															></use>
														</svg>
													</div>
												</div>
											</div>
											<div className="fr-fieldset__element">
												<div className="fr-radio-group fr-radio-rich">
													<input
														value="dark"
														type="radio"
														id="fr-radios-theme-dark"
														name="fr-radios-theme"
													/>
													<label
														className="fr-label"
														htmlFor="fr-radios-theme-dark"
													>
														Thème sombre
													</label>
													<div className="fr-radio-rich__img">
														<svg
															aria-hidden="true"
															className="fr-artwork"
															viewBox="0 0 80 80"
															width="80px"
															height="80px"
														>
															<use
																className="fr-artwork-decorative"
																href="/img/artwork/pictograms/environment/moon.svg#artwork-decorative"
															></use>
															<use
																className="fr-artwork-minor"
																href="/img/artwork/pictograms/environment/moon.svg#artwork-minor"
															></use>
															<use
																className="fr-artwork-major"
																href="/img/artwork/pictograms/environment/moon.svg#artwork-major"
															></use>
														</svg>
													</div>
												</div>
											</div>
											<div className="fr-fieldset__element">
												<div className="fr-radio-group fr-radio-rich">
													<input
														value="system"
														type="radio"
														id="fr-radios-theme-system"
														name="fr-radios-theme"
													/>
													<label
														className="fr-label"
														htmlFor="fr-radios-theme-system"
													>
														Système
														<span className="fr-hint-text">
															Utilise les paramètres système
														</span>
													</label>
													<div className="fr-radio-rich__img">
														<svg
															aria-hidden="true"
															className="fr-artwork"
															viewBox="0 0 80 80"
															width="80px"
															height="80px"
														>
															<use
																className="fr-artwork-decorative"
																href="/img/artwork/pictograms/system/system.svg#artwork-decorative"
															></use>
															<use
																className="fr-artwork-minor"
																href="/img/artwork/pictograms/system/system.svg#artwork-minor"
															></use>
															<use
																className="fr-artwork-major"
																href="/img/artwork/pictograms/system/system.svg#artwork-major"
															></use>
														</svg>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
