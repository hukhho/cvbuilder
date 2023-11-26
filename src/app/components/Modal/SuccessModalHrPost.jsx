import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';

const SuccessModalHrPost = open => {
  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    router.push('/hr/list/post');
  };
  return (
    <Modal title="Create post success" centered open={open} onOk={e => handleClick(e)} width={1000}>
      Successs
    </Modal>
  );
};
export default SuccessModalHrPost;
