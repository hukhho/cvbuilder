'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import PropTypes from 'prop-types';
import '../app/styles/globals.css';
import dynamic from 'next/dynamic';
import Auth0ProviderWithNavigate from '@/app/Auth0ProviderWithNavigate';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '@/app/components/PageLoader';
import { notification } from 'antd';

const StyledComponentsRegistry = ({ children }) => {
  const cache = createCache();
  const { isLoading } = useAuth0();

  // Use useServerInsertedHTML only on the server side
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));

  return (
    <Auth0ProviderWithNavigate>
      <StyleProvider cache={cache}> {children}</StyleProvider>
    </Auth0ProviderWithNavigate>
  );
};

// Optional: Add PropTypes for prop type checking
StyledComponentsRegistry.propTypes = {
  children: PropTypes.node,
};

export default StyledComponentsRegistry;
