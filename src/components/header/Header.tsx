import { useState, useEffect } from 'react';
import { Header as HeaderDSFR } from '@codegouvfr/react-dsfr/Header';
import { HeaderType } from './HeaderType';
import { DEFAULT_HEADER } from './default-header';

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

	useEffect(
		function () {
			if (header) {
				setBrandTop(header.brandTop || DEFAULT_HEADER.brandTop);
				setHomeLinkProps(header.homeLinkProps || DEFAULT_HEADER.homeLinkProps);
				setServiceTitle(header.serviceTitle || DEFAULT_HEADER.serviceTitle);
				setOperatorLogo(header.operatorLogo || DEFAULT_HEADER.operatorLogo);
			}
		},
		[header]
	);

	useEffect(
		function () {
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
		},
		[isAuthenticated, handleOidcAuth, header]
	);

	return (
		<HeaderDSFR
			brandTop={brandTop}
			homeLinkProps={homeLinkProps}
			serviceTitle={serviceTitle}
			operatorLogo={operatorLogo}
			quickAccessItems={quickAccessItems}
		/>
	);
}
