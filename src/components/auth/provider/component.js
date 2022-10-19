import React, { useEffect, useState } from 'react';
import { OIDC, NONE } from 'utils/constants';
import { LoaderSimple } from 'components/shared/loader';
import { getOidc } from 'utils/configuration';
import { errorDictionary } from 'i18n';
import { createKeycloakOidcClient } from 'utils/keycloak';
import { listenActivity } from 'utils/events';

export const AuthContext = React.createContext();

const AuthProvider = ({ authType, urlPortail, children }) => {
	const [oidcClient, setOidcClient] = useState(() => {
		switch (authType) {
			case OIDC:
				return null;
			case NONE:
				return dummyOidcClient;
			default:
				throw new Error(errorDictionary.noAuthFile);
		}
	});

	useEffect(() => {
		if (authType !== OIDC) {
			return;
		}

		(async () => {
			const oidcConf = await getOidc();

			const oidcClient = await createKeycloakOidcClient({
				url: oidcConf['auth-server-url'],
				realm: oidcConf['realm'],
				clientId: oidcConf['resource'],
				urlPortail,
				evtUserActivity: listenActivity,
			});

			setOidcClient(oidcClient);
		})();
	}, [authType, urlPortail]);

	if (oidcClient === null) return <LoaderSimple />;

	return (
		<AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
	);
};

const dummyOidcClient = {
	isUserLoggedIn: true,
	accessToken: null,
	logout: () => (window.location.href = '/'),
};

export default AuthProvider;
