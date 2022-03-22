import React, { useEffect, useState } from 'react';
import { OIDC, NONE } from 'utils/constants';
import { useHistory } from 'react-router';
import { LoaderSimple } from 'components/shared/loader';
import { getOidc } from 'utils/configuration';
import { errorDictionary } from 'i18n';
import { ErrorFallback } from 'components/shared/error';
import { createKeycloakOidcClient } from 'utils/keycloak';
import { listenActivity } from 'utils/events';

export const AuthContext = React.createContext();

const AuthProvider = ({ authType, urlPortail, children }) => {
  
  const [oidcClient, setOidcClient] = useState(
    ()=> {
      switch(authType){
        case OIDC: return null;
        case NONE: return dummyOidcClient;
        default: throw new Error("Non supported auth type");
      }
    }
  );
  
  useEffect(
     ()=> {
      
      if( authType !== OIDC ){
        return;
      }
       
      (async ()=>{
        
          const oidcConf = await getOidc();
        
          const oidcClient = await createKeycloakOidcClient({
            url: oidcConfig['auth-server-url'],
            realm: oidcConfig['realm'],
            clientId: oidcConfig['resource'],
            urlPortail,
            evtUserActivity: listenActivity,
          });
        
          setOidcClient(oidcClient);
       
      })();
      
    },
    []
  );

  if (oidcClient === null) return <LoaderSimple />;

  return (
    <AuthContext.Provider value={oidcClient}>{children}</AuthContext.Provider>
  );
};

const dummyOidcClient = {
   isUserLoggedIn: true,
   accessToken: null,
   logout: () => history.push('/'),
};

export default AuthProvider;
