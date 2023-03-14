import { OidcSecure as OidcSecureAxa } from '@axa-fr/react-oidc';

type OidcSecureProps = {
	children: Array<JSX.Element> | JSX.Element;
};

export function OidcSecure({ children }: OidcSecureProps) {
	return <OidcSecureAxa>{children}</OidcSecureAxa>;
}
