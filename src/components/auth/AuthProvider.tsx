import { useRef, useState } from 'react';
import {
	OidcConfiguration,
	OidcProvider,
	TokenRenewMode,
} from '@axa-fr/react-oidc';

import { Layout as LayoutSkeleton } from '../skeleton/Layout';
import { Authenticating } from '../Oidc/Authenticating';
import { publicGetRequest } from '../../lib/commons/axios-utils';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { CallbackSuccess } from '../Oidc/CallbackSuccess';
import { AuthenticatingError } from '../Oidc/AuthenticatingError';
import { ServiceWorkerNotSupported } from '../Oidc/ServiceWorkerNotSupported';
import { SessionLost } from '../Oidc/SessionLost';

function Pending() {
	return <LayoutSkeleton />;
}

type AuthProviderProps = {
	children: JSX.Element;
};

function fetchConfig(): Promise<OidcConfiguration> {
	return publicGetRequest<OidcConfiguration>('/configuration.json');
}

export function AuthProvider({ children }: AuthProviderProps) {
	return children;
	const alreadyLoad = useRef(false);
	const [configuration, setConfiguration] = useState<
		OidcConfiguration | undefined
	>(undefined);
	useAsyncEffect(async () => {
		if (alreadyLoad.current) {
			return;
		}
		alreadyLoad.current = true;
		const conf = await fetchConfig();
		setConfiguration({
			...conf,
			redirect_uri: `${window.location.origin}/login`,
			token_renew_mode: TokenRenewMode.access_token_invalid,
			refresh_time_before_tokens_expiration_in_second: 40,
		});
	}, [alreadyLoad]);

	if (configuration !== undefined) {
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
	return <Pending />;
}
