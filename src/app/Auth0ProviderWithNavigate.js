// components/Auth0ProviderWithNavigate.js

'use client';

import { Auth0Provider } from '@/lib/Auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Auth0ProviderWithNavigate = ({ children }) => {
  const router = useRouter();

  // const REACT_APP_AUTH0_DOMAIN = 'dev-gzgdh7hw4udvv70u.us.auth0.com';
  // const REACT_APP_AUTH0_CLIENT_ID = '6zBHDZwp850oG9WU28BHXobK7vkFByPl';
  // const REACT_APP_AUTH0_CALLBACK_URL = 'http://localhost:4040/callback';
  // const REACT_APP_API_SERVER_URL = 'http://localhost:6060';
  // const REACT_APP_AUTH0_AUDIENCE = 'https://cvbuilder.monoinfinity.net/';

  // const currentProtocol = window.location.protocol;
  // const currentHost = window.location.host;

  // const redirectUri = `${currentProtocol}//${currentHost}/callback`;

  // console.log("hello: ", test, test1)

  const domain = 'dev-gzgdh7hw4udvv70u.us.auth0.com';
  const clientId = '6zBHDZwp850oG9WU28BHXobK7vkFByPl';
  const redirectUri = 'http://localhost:3000/callback';
  // const redirectUri = 'https://cvbuilder.monoinfinity.net/callback';
  const audience = 'https://cvbuilder.monoinfinity.net/';

  useEffect(() => {
    if (!(domain && clientId && redirectUri && audience)) {
      console.error('Auth0 configuration missing.');
    }
  }, [router, domain, clientId, redirectUri, audience]);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={appState => {
        router.push(appState?.returnTo || window.location.pathname);
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
