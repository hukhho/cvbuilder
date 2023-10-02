import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Divider, Typography } from 'antd';

const ContactInfoItem = ({ icon, text }) => (
  <div>
    <FontAwesomeIcon icon={icon} className="mr-1" />
    <span>{text}</span>
  </div>
);

const InformationSection = ({ userInfo, templateType }) => {
  const { fullName, emailAddress, phone, personalWebsite } = userInfo;

  const isClassicalTemplate = templateType === 'classical';
  const isModernTemplate = templateType === 'modern';

  return (
    <div
      className={`information-section-container mb-4 ${isClassicalTemplate ? 'text-center' : ''}`}
    >
      <div className={`name ${isClassicalTemplate ? 'justify-center' : ''}`}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {fullName}
        </Typography.Title>
        {isModernTemplate && (
          <Divider
            style={{
              margin: '10px 0 0 0',
              borderTop: '2px solid #423b3b',
            }}
          />
        )}
        <div className={`contact-info ${isClassicalTemplate ? 'justify-center' : ''}`}>
          <ContactInfoItem icon={faEnvelope} text={emailAddress} />
          <ContactInfoItem icon={faPhone} text={phone} />
          <ContactInfoItem icon={faGlobe} text={personalWebsite} />
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
