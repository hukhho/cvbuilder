'use client';

import { useAuth0 } from '@/lib/Auth0';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CallbackPage = () => {
  const { error } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error('Auth0 error:', error);
      // Render an error message or handle the error as needed
    } else {
      router.push('/resume');
    }
  }, [error, router]);

  return (
    <div className="page-layout">
      <div className="page-layout__content"> </div>
    </div>
  );
};

export default CallbackPage;
