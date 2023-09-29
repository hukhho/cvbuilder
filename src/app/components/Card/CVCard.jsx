import React from 'react';
import Image from 'next/image';
import { Card } from 'antd';
const { Meta } = Card;

const cardContentStyle = {
  alignItems: 'center', // To align items vertically centered
};

function CVCard({ imageUrl, title }) {
  return (
    <Card
      hoverable
      style={{ width: 240 }} // Adjust this value based on your needs
    >
      <div style={cardContentStyle}>
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Meta title={title} description="cv" />
      </div>
    </Card>
  );
}

export default CVCard;
