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

const InformationSection = ({ userInfo, templateType, layoutStyles }) => {
  const { fullName, email, phone, personalWebsite, address, linkedIn } = userInfo;

  const isClassicalTemplate = templateType === 'classical';

  const isModernTemplate = templateType === 'modern';

  return (
    //   _     _                   _
    //   _ __ | |__ (_)_ __     ___ __ _(_)   ___ ___  _ __     ___ __ _  ___
    //  | '_ \| '_ \| | '_ \   / __/ _` | |  / __/ _ \| '_ \   / __/ _` |/ __|
    //  | | | | | | | | | | | | (_| (_| | | | (_| (_) | | | | | (_| (_| | (__
    //  |_| |_|_| |_|_|_| |_|  \___\__,_|_|  \___\___/|_| |_|  \___\__,_|\___|

    // <div
    //   className={`information-section-container mb-4 ${isClassicalTemplate ? 'text-center' : ''}`}
    // >
    //   <div className={`name ${isClassicalTemplate ? 'justify-center' : ''}`}>
    //     <Typography.Title level={2} style={{ margin: 0, fontSize: '1.6em', fontFamily: 'inherit' }}>
    //       {name}
    //     </Typography.Title>
    //     {isModernTemplate && (
    //       <Divider
    //         style={{
    //           margin: '10px 0 0 0',
    //           borderTop: '2px solid #423b3b',
    //         }}
    //       />
    //     )}
    //     <div className={`contact-info ${isClassicalTemplate ? 'justify-center' : ''}`}>
    //       {address && <ContactInfoItem icon={faAddressCard} text={address} />}
    //       {email && <ContactInfoItem icon={faEnvelope} text={email} />}
    //       {phone && <ContactInfoItem icon={faPhone} text={phone} />}
    //       {linkedIn && <ContactInfoItem icon={faLinkedin} text={linkedIn} />}
    //       {personalWebsite && <ContactInfoItem icon={faGlobe} text={personalWebsite} />}
    //       {}
    //     </div>
    //   </div>
    // </div>
    <div
      className={`${isClassicalTemplate ? 'justify-center' : ''}`}
      style={{ zoom: layoutStyles.zoom, lineHeight: layoutStyles.lineHeight }}
    >
      <div
        className="flex flex-row items-end gap-4 pb-2"
        style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
      >
        <div className="grow">
          <h1
            className={`${isClassicalTemplate ? 'text-center' : ''} font-bold`}
            style={{
              fontSize: '1.65em',
              fontFamily: 'Merriweather, serif',
              lineHeight: 'inherit',
              color: layoutStyles.fontColor,
            }}
          >
            {fullName}
          </h1>
          <div
            className={`${isClassicalTemplate ? 'text-center' : ''} pt-[2px] false`}
            style={{
              fontWeight: 300,
              fontSize: '0.75em',
            }}
          >
            {/* <ul className="inline-block mr-1">
              <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                New York City
              </li>
              <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                United States
              </li>
            </ul> */}
            <span className="inline-block mr-1">
              {/* <i className="mr-1">•</i> */}
              {email}
            </span>
            <span className="inline-block mr-1">
              <i className="mr-1">•</i>
              {phone}
            </span>
            <span className="inline-block mr-1">
              <i className="mr-1">•</i>
              {personalWebsite}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
