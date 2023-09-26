import { Divider, Radio, Typography } from 'antd';
import './CVTemplates.scss';
import Paragraph from 'antd/es/typography/Paragraph';

const InformationSection = ({ userInfo }) => {
  const { fullName, emailAddress, phone, personalWebsite } = userInfo;
  return (
    <div className="information-section-container">
      <div className="name">
        <Typography.Title level={2} style={{ margin: 0 }}>
          {fullName}
        </Typography.Title>
        <div className="contact-info">
          <span>{emailAddress}</span>
          <span>{phone}</span>
          <span>{personalWebsite}</span>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
