import { Space, Spin } from 'antd';
import React from 'react';

export const PageLoader = () => {
  const loadingImg = 'https://cdn.auth0.com/blog/hello-auth0/loader.svg';

  return (
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
  );
};
