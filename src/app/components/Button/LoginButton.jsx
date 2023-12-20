import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LoginButton = ({ roleName }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/resume',
      },
      authorizationParams: {
        connection: 'google-oauth2',
        // prompt: 'login',
        metadata: roleName,
      },
    });
  };

  return (
    // <button className="button__login" onClick={handleLogin}>
    //   Log In
    // </button>

    <button
      onClick={handleLogin}
      href=""
      data-size="default"
      data-theme="secondary"
      data-busy="false"
      className="src-components-AuthForm--ZJCXla9nmw4= src-components-Button--kYf2WsZ80yU= "
    >
      <svg
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className="src-components-AuthForm--6Jz8mKqOaJg="
      >
        <clipPath id="google_svg__a">
          <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
        </clipPath>
        <path fill="#fbbc05" d="M0 37V11l17 13z" clipPath="url(#google_svg__a)" />
        <path fill="#ea4335" d="m0 11 17 13 7-6.1L48 14V0H0z" clipPath="url(#google_svg__a)" />
        <path fill="#34a853" d="m0 37 30-23 7.9 1L48 0v48H0z" clipPath="url(#google_svg__a)" />
        <path fill="#4285f4" d="M48 48 17 24l-4-3 35-10z" clipPath="url(#google_svg__a)" />
      </svg>
      Google
    </button>
  );
};
