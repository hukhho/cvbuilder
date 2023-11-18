'use client';

import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { LoginButton } from './Button/LoginButton';
import { SignupButton } from './Button/SignupButton';
import { LogoutButton } from './Button/LogoutButton';

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && <LogoutButton />}
    </div>
  );
};
