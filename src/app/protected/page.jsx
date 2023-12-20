'use client';

import { useAuth0 } from '@/lib/Auth0';
import React, { useEffect, useState } from 'react';
import { getProtectedResource } from '../services/message.service';
import AuthenticationGuard from '../components/AuthenticationGuard';
import { parse, serialize } from 'cookie';
import useStore from '@/store/store';

const ProtectedPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState('');
  const { setEmail, setAvatar, setUserRole, setBalance } = useStore();

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();

      console.log('accessToken', accessToken);

      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }
      if (data) {
        localStorage.setItem('accessToken', accessToken);

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
  return <AuthenticationGuard>{message}</AuthenticationGuard>;
};
export default ProtectedPage;
