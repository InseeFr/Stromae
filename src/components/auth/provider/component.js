import { LoaderSimple } from 'components/shared/loader';
import { OidcProvider } from 'utils/oidc';

export function AuthProvider({ children }) {
  return <OidcProvider fallback={<LoaderSimple />}>{children}</OidcProvider>;
}
