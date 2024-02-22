import { FooterProps } from '@codegouvfr/react-dsfr/Footer';
import { RegisteredLinkProps } from '@codegouvfr/react-dsfr/link';

export type FooterType = FooterProps & {
	otherLinksProps: Array<RegisteredLinkProps>;
	appSupplementaire: any;
};

export type FooterJsonProps = {
	brandTop?: Content;
	operatorLogo?: OperatorLogo;
	accessibility?: string;
	accessibilityLinkProps?: LinkProps;
	homeLinkProps?: HomeLinkProps;
	termsLinkProps?: LinkProps;
	websiteMapLinkProps?: LinkProps;
	contentDescription?: string;
	license?: Content;
	appSupplementaire?: string;
};

export type LinkProps = {
	to: string;
};

export type Content = {
	value: string;
	type: string;
};

export type HomeLinkProps = {
	title: string;
	to: string;
};

export type OperatorLogo = {
	alt: string;
	imgUrl: string;
	orientation: string;
};
