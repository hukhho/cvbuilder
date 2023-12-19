import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faCloud,
  faEnvelope,
  faGlobe,
  faMobile,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Divider, Typography } from 'antd';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactInfoItem = ({ icon, text }) => (
  <div>
    <FontAwesomeIcon icon={icon} className="mr-1" />
    <span>{text}</span>
  </div>
);

const InformationSection = ({ userInfo, templateType, layoutStyles }) => {
  const { name, email, phone, personalWebsite, address, linkin, city } = userInfo;

  const isClassicalTemplate = templateType === 'classical';

  const isModernTemplate = templateType === 'modern';
  switch (templateType) {
    case 'modern':
      return (
        <div className="pb-[20px]">
          <div
            className="flex flex-row items-end gap-4 pb-2"
            style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
          >
            <div className="grow">
              <h1
                className="font-bold text-left"
                style={{
                  color: 'rgb(46, 61, 80)',
                  fontSize: '2.1em',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  lineHeight: 'inherit',
                }}
              >
                {name}
              </h1>
              <div className="w-[75%] h-[2px] bg-[#d9d9d9] mt-[0.5em] mb-[1.2em]" />
              <div
                className="pt-[2px] text-left false"
                style={{
                  color: 'rgb(46, 61, 80)',
                  fontWeight: 400,
                  fontSize: '0.85em',
                }}
              >
                {email && (
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faEnvelope} />
                    {email}
                  </span>
                )}

                {phone && (
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faMobile} />
                    {phone}
                  </span>
                )}
                {linkin && (
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faLinkedin} />
                    {linkin}
                  </span>
                )}
                {personalWebsite && (
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faCloud} />
                    {personalWebsite}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case 'modern-2':
      return (
        <div className="pb-[20px]">
          <div
            className="flex flex-row items-end gap-4 pb-2"
            style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
          >
            <div className="grow">
              <h1
                className="font-bold text-left"
                style={{
                  color: 'rgb(77, 112, 235)',
                  fontSize: '2.1em',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  lineHeight: 'inherit',
                }}
              >
                {name}
              </h1>
              <div
                className="flex flex-row flex-wrap gap-1 items-center pt-[2px]  false"
                style={{
                  color: 'rgb(153, 153, 153)',
                  fontWeight: 400,
                  fontSize: '0.85em',
                  justifyContent: 'left',
                }}
              >
                <div className="flex flex-row gap-1 items-center mr-1">
                  <div className="">{city}</div>
                </div>
                {email && (
                  <span className="flex flex-row gap-1 items-center mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faEnvelope} />

                    <div>{email}</div>
                  </span>
                )}
                {phone && (
                  <span className="flex flex-row gap-1 items-center mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faMobile} />
                    <div>{phone}</div>
                  </span>
                )}

                {linkin && (
                  <span className="flex flex-row gap-1 items-center mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faLinkedin} />
                    <div>{linkin}</div>
                  </span>
                )}
                {personalWebsite && (
                  <span className="flex flex-row gap-1 items-center mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faCloud} />
                    <div>{personalWebsite}</div>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <>
          {' '}
          <div
            className={`${isClassicalTemplate ? 'justify-center' : ''}`}
            style={{ lineHeight: layoutStyles.lineHeight }}
          >
            <div
              className="flex flex-row items-end gap-4 pb-2"
              style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
            >
              <div className="grow">
                <h1
                  className={`${isClassicalTemplate ? 'text-center' : ''} font-bold`}
                  style={{
                    // ...layoutStyles,
                    fontSize: '1.65em',
                    // fontFamily: 'Merriweather, serif',
                    fontFamily: layoutStyles.fontFamily,
                    lineHeight: 'inherit',
                    color: layoutStyles.fontColor,
                  }}
                >
                  {name}
                </h1>
                <div
                  className={`${isClassicalTemplate ? 'text-center' : ''} pt-[2px] false`}
                  style={{
                    fontWeight: 300,
                    fontSize: '0.75em',
                  }}
                >
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faEnvelope} />
                    {email}
                  </span>
                  <span className="inline-block mr-1">
                    <FontAwesomeIcon className="mr-1" icon={faMobile} />
                    {phone}
                  </span>
                  {linkin && (
                    <span className="inline-block mr-1">
                      <FontAwesomeIcon className="mr-1" icon={faLinkedin} />
                      {linkin}
                    </span>
                  )}
                  {personalWebsite && (
                    <span className="inline-block mr-1">
                      <FontAwesomeIcon className="mr-1" icon={faCloud} />
                      {personalWebsite}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
};

export default InformationSection;
