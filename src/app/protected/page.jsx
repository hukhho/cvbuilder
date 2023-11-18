/* eslint-disable */

'use client';

import { useAuth0 } from '@/lib/Auth0';
import React, { useEffect, useState } from 'react';
import { getProtectedResource } from '../services/message.service';
import AuthenticationGuard from '../components/AuthenticationGuard';
import { parse, serialize } from 'cookie';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log('accessToken', accessToken);
      // Set the cookie
      document.cookie = serialize('token', accessToken, {
        path: '/', // The path for which the cookie is valid
        maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed)
        secure: false, // Use 'secure' in production for HTTPS-only cookies
      });
      const { data, error } = await getProtectedResource(accessToken);
      if (!isMounted) {
        return;
      }
      if (data) {
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
  return (
    <AuthenticationGuard>
      <>{message}</>
    </AuthenticationGuard>
  );
};
export default ProtectedPage;
