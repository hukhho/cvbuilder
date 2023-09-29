import React, { useState } from 'react';
import { Segmented } from 'antd';
import '../styles/user-header.css';

const UserHeader = () => {
  const [value, setValue] = useState('RESUME');

  const segmentedStyle = {
    itemSelectedBg: '#4d70eb', // Set the background color for selected item
  };

  return (
    <div>
      <Segmented options={['RESUME', 'COVER LETTERS', 'RESIGNATION LETTERS']} value={value} onChange={setValue} />
    </div>
  );
};

export default UserHeader;
