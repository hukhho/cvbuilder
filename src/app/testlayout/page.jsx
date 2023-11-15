'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './sidebar.css';
import './sidebar1.css';
import './sidebarlayout.css';
import './layout.css';
import CanvasGradient from './CanvasGradient';

const COLORS = {
  Primary: '#372e8f',
  Secondary: '#9a227f',
  Three: '#020d3b',
};

const styles = {
  compareBox: {
    margin: '24px 0',
    height: 48,
    width: 360,
  },

  threeColorGradient: {
    backgroundImage: `linear-gradient(61.63deg, ${COLORS.Primary} 0%, ${COLORS.Secondary} 50%, ${COLORS.Three} 100%)`,
  },
};

export default function TestPage() {
  return (
    <div style={{ ...styles.compareBox }}>
      <CanvasGradient
        animated
        angle={61.63}
        stops={[
          { offset: 0.0, color: COLORS.Primary },
          { offset: 0.25, color: COLORS.Secondary },
          { offset: 0.5, color: COLORS.Three },
          { offset: 0.75, color: COLORS.Secondary },
          { offset: 1.0, color: COLORS.Primary },
        ]}
      />
    </div>
  );
}
