import { Divider, Radio, Typography } from 'antd';
import './CVTemplates.scss';
import Paragraph from 'antd/es/typography/Paragraph';

const CertificationsSection = ({ certifications }) => {
  return (
    <div className="certifications-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Certifications
        </Typography.Title>
        <Divider />
        <div className="certification-items">
          <Paragraph />
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;
