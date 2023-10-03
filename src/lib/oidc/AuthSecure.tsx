import { OidcSecure as OidcSecureAxa } from '@axa-fr/react-oidc';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';

type OidcSecureProps = {
	children: Array<JSX.Element> | JSX.Element;
};

const { AUTH_TYPE } = environment;

export function AuthSecure({ children }: OidcSecureProps) {
	const isOidcEnabled = AUTH_TYPE === AuthTypeEnum.Oidc;
	if (isOidcEnabled) return <OidcSecureAxa>{children}</OidcSecureAxa>;
	return <>{children}</>;
}
