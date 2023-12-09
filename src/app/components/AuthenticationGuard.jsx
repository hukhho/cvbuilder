/* eslint-disable */

import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Space, Spin } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation'; // Assuming you are using Next.js

const AuthenticationGuard = ({ children }) => {
  const router = useRouter();

  const Component = withAuthenticationRequired(() => children, {
    onRedirecting: () => (
      <div className="page-layout" style={{ minHeight: '100vh' }}>
        <Space
          direction="vertical"
          size="middle"
          align="center"
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Spin size="large" />
          <h2>We are checking authentication guard... waiting~</h2>
        </Space>
      </div>
    ),
    redirectTo: '/login', // Redirect to /login if not authenticated
  });

  return <Component />;
};

export default AuthenticationGuard;
