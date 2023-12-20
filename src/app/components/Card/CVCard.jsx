import Image from 'next/image';
import { Card } from 'antd';

const { Meta } = Card;

const cardContentStyle = {
  alignItems: 'center',
};

function CVCard({ imageUrl, title }) {
  return (
    <Card hoverable style={{ width: 240 }}>
      <div style={cardContentStyle}>
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          {' '}
          <Image
            src="https://photos.pinksale.finance/file/pinksale-logo-upload/1692701716873-e9b5323edab631aa000eabb7a8512a33.PNG"
            alt="example"
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
