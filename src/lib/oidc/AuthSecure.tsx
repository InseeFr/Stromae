import { OidcSecure as OidcSecureAxa } from '@axa-fr/react-oidc';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

type OidcSecureProps = {
	children: Array<JSX.Element> | JSX.Element;
};

const { AUTH_TYPE } = environment;

export function AuthSecure({ children }: OidcSecureProps) {
	if (AUTH_TYPE === AuthTypeEnum.Oidc)
		return <OidcSecureAxa>{children}</OidcSecureAxa>;
	return <>{children}</>;
}

export function OidcSecure({ children }: OidcSecureProps) {
	return <OidcSecureAxa>{children}</OidcSecureAxa>;
}
