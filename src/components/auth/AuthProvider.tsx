import {
	OidcConfiguration,
	OidcProvider,
	TokenRenewMode,
} from '@axa-fr/react-oidc';
import { useRef, useState } from 'react';

import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { publicGetRequest } from '../../lib/commons/axios-utils';
import { AuthTypeEnum, environment } from '../../utils/read-env-vars';
import { Authenticating } from '../Oidc/Authenticating';
import { AuthenticatingError } from '../Oidc/AuthenticatingError';
import { CallbackSuccess } from '../Oidc/CallbackSuccess';
import { ServiceWorkerNotSupported } from '../Oidc/ServiceWorkerNotSupported';
import { SessionLost } from '../Oidc/SessionLost';
import { Layout as LayoutSkeleton } from '../skeleton/Layout';

function Pending() {
	return <LayoutSkeleton />;
}

type AuthProviderProps = {
	children: JSX.Element;
};

function fetchConfig(): Promise<OidcConfiguration> {
	return publicGetRequest<OidcConfiguration>('/configuration.json');
}

const { AUTH_TYPE } = environment;

export function AuthProvider({ children }: AuthProviderProps) {
	const alreadyLoad = useRef(false);
	const [configuration, setConfiguration] = useState<
		OidcConfiguration | undefined
	>(undefined);
	useAsyncEffect(async () => {
		if (alreadyLoad.current) {
			return;
		}
		alreadyLoad.current = true;

		if (AUTH_TYPE === AuthTypeEnum.Oidc) {
			const conf = await fetchConfig();
			setConfiguration({
				...conf,
				redirect_uri: `${window.location.origin}/login`,
				token_renew_mode: TokenRenewMode.access_token_invalid,
				refresh_time_before_tokens_expiration_in_second: 40,
			});
		}
	}, [alreadyLoad]);

	if (AUTH_TYPE === AuthTypeEnum.Oidc && configuration !== undefined) {
		return (
			<OidcProvider
				configuration={configuration}
				loadingComponent={LayoutSkeleton}
				authenticatingComponent={Authenticating}
				callbackSuccessComponent={CallbackSuccess}
				sessionLostComponent={SessionLost}
				authenticatingErrorComponent={AuthenticatingError}
				serviceWorkerNotSupportedComponent={ServiceWorkerNotSupported}
			>
				{children}
			</OidcProvider>
		);
	}
	if (AUTH_TYPE === AuthTypeEnum.Oidc && configuration === undefined)
		return <Pending />;
	return <>{children}</>;
}
