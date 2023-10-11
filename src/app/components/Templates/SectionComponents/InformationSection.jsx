import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Divider, Typography } from 'antd';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactInfoItem = ({ icon, text }) => (
  <div>
    <FontAwesomeIcon icon={icon} className="mr-1" />
    <span>{text}</span>
  </div>
);

const InformationSection = ({ userInfo, templateType }) => {
  const { name, email, phone, personalWebsite, address, linkedIn } = userInfo;

  const isClassicalTemplate = templateType === 'classical';
  const isModernTemplate = templateType === 'modern';

  return (
    <div
      className={`information-section-container mb-4 ${isClassicalTemplate ? 'text-center' : ''}`}
    >
      <div className={`name ${isClassicalTemplate ? 'justify-center' : ''}`}>
        <Typography.Title level={2} style={{ margin: 0, fontSize: '1.6em', fontFamily: 'inherit' }}>
          {name}
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
          {address && <ContactInfoItem icon={faAddressCard} text={address} />}
          {email && <ContactInfoItem icon={faEnvelope} text={email} />}
          {phone && <ContactInfoItem icon={faPhone} text={phone} />}
          {linkedIn && <ContactInfoItem icon={faLinkedin} text={linkedIn} />}
          {personalWebsite && <ContactInfoItem icon={faGlobe} text={personalWebsite} />}
          {}
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
