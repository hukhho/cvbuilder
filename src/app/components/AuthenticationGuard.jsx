/* eslint-disable */

import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';

const AuthenticationGuard = ({ children }) => {
  const Component = withAuthenticationRequired(() => children, {
    onRedirecting: () => <div className="page-layout">Loading...</div>,
  });

  return <Component />;
};

export default AuthenticationGuard;
