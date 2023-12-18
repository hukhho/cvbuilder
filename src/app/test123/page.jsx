'use client';

// SomeComponent.js
import React from 'react';
import useStore from '@/store/store';
import { Button, notification } from 'antd';

export default function SomeComponent() {
  const notifyError = () => {
    notification.error({
      message: 'some message',
    });
  };

  return (
    <>
      {/* {notificationContextHolder} */}
      <Button type="primary" onClick={notifyError}>
        notify me
      </Button>
    </>
  );
}
