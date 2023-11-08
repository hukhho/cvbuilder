import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';

export default function MainLayout({ children }) {
  return (
    <ConfigProvider>
      <body className="pro-ui">{children}</body>
    </ConfigProvider>
  );
}
