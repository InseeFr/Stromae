import { Footer as FooterDSFR } from '@codegouvfr/react-dsfr/Footer';

import ConvertContent from "../../convertContent";

import { FooterType } from "./FooterType";

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
	bottomItems: undefined,
	license: undefined,
	operatorLogo: undefined,
};

type FooterProps = { footer?: FooterType };

export function Footer(props: FooterProps) {
	const {
		brandTop,
		accessibility,
		homeLinkProps,
		contentDescription,
		personalDataLinkProps,
		termsLinkProps,
		websiteMapLinkProps,
		bottomItems,
		license,
		operatorLogo,
	} = props.footer || DEFAULT_FOOTER;

	return (
		<FooterDSFR
			accessibility={accessibility}
			brandTop={<ConvertContent content={brandTop as any} />}
			homeLinkProps={homeLinkProps}
			termsLinkProps={termsLinkProps}
			websiteMapLinkProps={websiteMapLinkProps}
			license={<ConvertContent content={license as any} />}
			personalDataLinkProps={personalDataLinkProps}
			contentDescription={contentDescription}
			operatorLogo={operatorLogo}
			bottomItems={bottomItems}
		/>
	);
}
