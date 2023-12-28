/* eslint-disable */

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you are using Next.js
import useStore from '@/store/store';
import { getProtectedResource } from '../services/message.service';

const AuthenticationGuard = ({ children }) => {
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState('');
  const { setEmail, setAvatar, setUserRole, setBalance } = useStore();

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem('accessToken', accessToken);

      console.log('accessToken123', accessToken);

      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }
      if (data) {
        console.log("ProtectedPage accessToken", accessToken)
        localStorage.setItem('email', data?.email);
        localStorage.setItem('avatar', data?.avatar);
        localStorage.setItem('userId', data?.id);

        localStorage.setItem('userRole', data?.role?.roleName);

        // Update Zustand store with user data
        setEmail(data?.email);
        setAvatar(data?.avatar);
        setBalance(data?.accountBalance);
        setUserRole(data?.role?.roleName);

        setMessage(JSON.stringify(data, null, 2));
      }
      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };
    getMessage();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);
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
