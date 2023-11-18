'use client';

import { useAuth0 } from '@/lib/Auth0';
import React from 'react';

const CallbackPage = () => {
  const { error } = useAuth0();

  if (error) {
    return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Error
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>{error.message}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="page-layout__content" />
    </div>
  );
};
export default CallbackPage;
