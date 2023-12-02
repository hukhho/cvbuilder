import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';
import AuthenticationGuard from '../AuthenticationGuard';

export default function AuthLayout({ children }) {
  return <AuthenticationGuard>{children}</AuthenticationGuard>;
}
