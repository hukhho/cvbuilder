'use client';

// SomeComponent.js
import React from 'react';
import useStore from '@/store/store';

const SomeComponent = () => {
  const { avatar, userRole } = useStore();

  return (
    <div>
      <p>Avatar: {avatar}</p>
      <p>Counter: {userRole}</p>
    </div>
  );
};

export default SomeComponent;
