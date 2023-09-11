import { isValidElement, useMemo } from 'react';
import { HeaderQuickAccessItem, HeaderType } from './HeaderType';
import { DEFAULT_HEADER } from './default-header';
import ConvertContent from '../../utils/convertContent';
import Button from '@codegouvfr/react-dsfr/Button';
import Display from '@codegouvfr/react-dsfr/Display/Display';

export type HeaderProps = {
	header?: HeaderType;
	readonly handleOidcAuth?: () => void;
	isAuthenticated?: boolean;
};

export function Header(props: HeaderProps) {
	const { header, handleOidcAuth, isAuthenticated } = props;
	const brandTop = header?.brandTop ?? DEFAULT_HEADER.brandTop;
	const homeLinkProps = header?.homeLinkProps ?? DEFAULT_HEADER.homeLinkProps;
	const serviceTitle = header?.serviceTitle ?? DEFAULT_HEADER.serviceTitle;
	const operatorLogo = header?.operatorLogo ?? DEFAULT_HEADER.operatorLogo;
	const quickAccessItems = useMemo(
		() => [
			...(header?.quickAccessItems ?? []),
			{
				iconId: 'fr-icon-lock-line',
				buttonProps: {
					onClick: handleOidcAuth,
				},
				text: isAuthenticated ? 'Me déconnecter' : 'Me connecter',
			} satisfies HeaderQuickAccessItem,
		],
		[isAuthenticated, handleOidcAuth, header]
	);

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
										{quickAccessItems.map((item, index) => (
											<QuickAccessLi key={index} item={item} />
										))}
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
								{quickAccessItems.map((item, index) => (
									<QuickAccessLi key={index} item={item} />
								))}
							</ul>
						</div>
					</div>
				</div>
			</header>
			<Display />
		</>
	);
}

type QuickAccessLiProps = {
	item: HeaderQuickAccessItem;
};

function QuickAccessLi({ item }: QuickAccessLiProps) {
	if (!item) {
		return null;
	}

	if (typeof item === 'object' && 'buttonProps' in item && item.buttonProps) {
		return (
			<li>
				<Button iconId={item.iconId} onClick={item.buttonProps.onClick}>
					{item.text}
				</Button>
			</li>
		);
	}

	if (typeof item === 'object' && 'linkProps' in item) {
		return (
			<li>
				<Button
					linkProps={{
						target: item.linkProps.target,
						href: item.linkProps.href,
						title:
							item.linkProps.target === '_blank'
								? `${item.text} - ouvre une nouvelle fenêtre`
								: `${item.text}`,
					}}
				>
					{item.text}
				</Button>
			</li>
		);
	}

	// Item shape is unexpected at this point, try to find the best fallback to avoid errors
	if (isValidElement(item)) {
		return <li>{item}</li>;
	}

	if (typeof item === 'object' && 'text' in item) {
		return (
			<li>
				<Button>{`${item.text}`}</Button>
			</li>
		);
	}

	return null;
}
