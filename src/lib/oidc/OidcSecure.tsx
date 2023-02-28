import { OidcSecure as OidcSecureAxa } from '@axa-fr/react-oidc';

type OidcSecureProps = {
	children: Array<JSX.Element> | JSX.Element;
};

function OidcSecure({ children }: OidcSecureProps) {
	return <OidcSecureAxa>{children}</OidcSecureAxa>;
}

export default OidcSecure;
