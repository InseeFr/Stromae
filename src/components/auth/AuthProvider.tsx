import { useRef, useState } from 'react';
import { OidcConfiguration, OidcProvider, TokenRenewMode } from '@axa-fr/react-oidc';

import { Layout as LayoutSkeleton } from '../skeleton/Layout';
import { publicGetRequest } from '../../lib/commons/axios-utils';
import { useAsyncEffect } from '../../hooks/useAsyncEffect'

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
	}, [alreadyLoad])

	if (configuration !== undefined) {
		return (
			<OidcProvider configuration={configuration}>{children}</OidcProvider>
		);
	}
	return <Pending />;
}
