'use client';

import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import PropTypes from 'prop-types';

const StyledComponentsRegistry = ({ children }) => {
  const cache = createCache();
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

// Optional: Add PropTypes for prop type checking
StyledComponentsRegistry.propTypes = {
  children: PropTypes.node,
};

export default StyledComponentsRegistry;
