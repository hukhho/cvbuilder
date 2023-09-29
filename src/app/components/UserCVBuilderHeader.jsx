import React, { useState } from 'react';
import { Segmented, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const UserCVBuilderHeader = () => {
  const [value, setValue] = useState('RESUME');

  return (
    <div>
      <Text
        style={{
          width: '150px',
          maxWidth: '150px',
          height: '23.09px',
          left: '8.99px',
          top: '4.01px',
          background: 'rgba(116, 116, 116, 0.12)',
          borderRadius: '3.15px',
          textTransform: 'uppercase',
          color: '#565656',
          fontFamily: 'Source Sans Pro',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '12.6px',
          lineHeight: '13px',
          padding: '5px',
          marginRight: '10px',
        }}
      >
        PHAM VIET THUAN THIEN
      </Text>
      <Segmented
        options={[
          'CONTACT',
          'EXPERIENCE',
          'PROJECT',
          'EDUCATION',
          'CERTIFICATIONS',
          'COURSEWORK',
          'INVOLVEMENT',
          'SKILL',
          'SUMMARY',
          'FINISH UP',
          'AI COVER LETTER',
        ]}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default UserCVBuilderHeader;
