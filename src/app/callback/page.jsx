'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@/lib/Auth0';
import useStore from '@/store/store';
import { getProtectedResource } from '../services/message.service';
import { notification } from 'antd';

// Helper function to set cookies
const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const CallbackPage = () => {
  const { isLoading, isAuthenticated, error, user, getAccessTokenSilently } = useAuth0();
  const { setMessage, setEmail, setAvatar, setUserRole, setBalance } = useStore();

  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error('Auth0 error:', error);
      setMessage(JSON.stringify(error, null, 2));
      router.push('/error');
    } else if (isAuthenticated && !isLoading) {
      const handleUserAuthentication = async () => {
        try {
          const accessToken = await getAccessTokenSilently();
          localStorage.setItem('accessToken', accessToken); // This is fine to keep in client-side code
          console.log('accessToken123: ', accessToken);
          try {
            const { data } = await getProtectedResource(accessToken);
            console.log('data: ', data);
            if (!data) {
              console.error('No data received from protected resource!');
              notification.error({
                message: 'You do not have permission to perform this operation.',
              });
              router.push('/login');
              return;
            }
            console.log('data: ', data);

            // Save user data to localStorage
            localStorage.setItem('email', data.email);
            localStorage.setItem('avatar', data.avatar);
            localStorage.setItem('userId', data.id);

            // setCookie('userId', data.id, 7); // 7 days for cookie expiration

            localStorage.setItem('userRole', data.role.roleName);

            // Update Zustand store with user data
            setEmail(data.email);
            setAvatar(data.avatar);
            setBalance(data.accountBalance);
            setUserRole(data.role.roleName);

            // Redirect based on user role
            if (data.role.roleName === 'ADMIN') {
              router.push('/admin/dashboard');
            } else if (data.role.roleName === 'HR') {
              router.push('/hr/list');
            } else {
              router.push('/resume');
            }
          } catch (errorMessage) {
            console.log('error: ', errorMessage);
          }
        } catch (fetchError) {
          console.error('Fetching user data error:', fetchError);
          setMessage(JSON.stringify(fetchError, null, 2));
        }
      };

      handleUserAuthentication();
    }
  }, [
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
    router,
    setMessage,
    setEmail,
    setAvatar,
    setUserRole,
  ]);

  return (
    <div className="page-layout">
      <div className="page-layout__content">
        {/* Content or loading indicator */}
        {isLoading ? <p>Loading...</p> : null}
      </div>
    </div>
  );
};

export default CallbackPage;
