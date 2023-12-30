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
  const { logout } = useAuth0();

  const handleLogout = () => {
    // Clear the Zustand store
    setEmail('');
    setAvatar('');
    setUserRole('');
    if (typeof window !== 'undefined') {
      // Clear localStorage when logging out
      localStorage.removeItem('email');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userRole');
      localStorage.removeItem('accessToken');
    }
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      if (!isMounted) {
        return;
      }
      const userId = localStorage.getItem('userId');
      // if (!userId) {
      //   handleLogout()
      // } else if (accessToken && !userId) {
      //   localStorage.setItem('accessToken', accessToken); // This is fine to keep in client-side code
      // }
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
