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
  const { name, email, phone, personalWebsite, address, linkedIn } = userInfo;

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
                {/* <ul className="inline-block mr-1">
                  <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                    New York City
                  </li>
                  <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                    United States
                  </li>
                </ul> */}
                <span className="inline-block mr-1">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="contact-icon inline-block mr-1"
                    width="0.9em"
                    height="0.9em"
                    style={{ fill: 'rgb(46, 61, 80)' }}
                  >
                    <path d="M20.016 8.016V6L12 11.016 3.984 6v2.016L12 12.985zm0-4.032q.797 0 1.383.609t.586 1.406v12q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609t-.586-1.406v-12q0-.797.586-1.406t1.383-.609h16.031z" />
                  </svg>
                  {email}
                </span>
                <span className="inline-block mr-1">
                  {phone && (
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="contact-icon inline-block mr-1"
                      width="0.9em"
                      height="0.9em"
                      style={{ fill: 'rgb(46, 61, 80)' }}
                    >
                      <path d="M19.5 0h-15A1.5 1.5 0 0 0 3 1.5v21A1.5 1.5 0 0 0 4.5 24h15a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 19.5 0zM18 18H6V3h12z" />
                    </svg>
                  )}
                  {phone}
                </span>
                <span className="inline-block mr-1">
                  {linkedIn && (
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="contact-icon inline-block mr-1"
                      width="0.9em"
                      height="0.9em"
                      style={{ fill: 'rgb(46, 61, 80)' }}
                    >
                      <path d="M21.75 0H2.25A2.257 2.257 0 0 0 0 2.25v19.5A2.257 2.257 0 0 0 2.25 24h19.5A2.257 2.257 0 0 0 24 21.75V2.25A2.257 2.257 0 0 0 21.75 0zM9 19.5H6V9h3zm-1.5-12C6.67 7.5 6 6.83 6 6s.67-1.5 1.5-1.5S9 5.17 9 6s-.67 1.5-1.5 1.5zm12 12h-3v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6h-3V9h3v1.861C14.119 10.013 15.066 9 16.125 9c1.866 0 3.375 1.678 3.375 3.75z" />
                    </svg>
                  )}
                  {linkedIn}
                </span>
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
                  <div className=" [&:not(:last-child)]:after:content-[',']">New York City</div>
                  <div className=" [&:not(:last-child)]:after:content-[',']">United States</div>
                </div>
                <span className="flex flex-row gap-1 items-center mr-1">
                  <i className="mr-1">•</i>
                  <div>{email}</div>
                </span>
                <span className="flex flex-row gap-1 items-center mr-1">
                  <i className="mr-1">•</i>
                  <div>{phone}</div>
                </span>
                <span className="flex flex-row gap-1 items-center mr-1">
                  <i className="mr-1">•</i>
                  <div>{linkedIn}</div>
                </span>
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
                    {/* <i className="mr-1">•</i> */}
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="contact-icon inline-block mr-1"
                      width="0.9em"
                      height="0.9em"
                      style={{ fill: 'rgb(46, 61, 80)' }}
                    >
                      <path d="M20.016 8.016V6L12 11.016 3.984 6v2.016L12 12.985zm0-4.032q.797 0 1.383.609t.586 1.406v12q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609t-.586-1.406v-12q0-.797.586-1.406t1.383-.609h16.031z" />
                    </svg>
                    {email}
                  </span>
                  <span className="inline-block mr-1">
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="contact-icon inline-block mr-1"
                      width="0.9em"
                      height="0.9em"
                      style={{ fill: 'rgb(46, 61, 80)' }}
                    >
                      <path d="M19.5 0h-15A1.5 1.5 0 0 0 3 1.5v21A1.5 1.5 0 0 0 4.5 24h15a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 19.5 0zM18 18H6V3h12z" />
                    </svg>
                    {phone}
                  </span>
                  <span className="inline-block mr-1">
                    {personalWebsite && (
                      <svg
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="contact-icon inline-block mr-1"
                        width="0.9em"
                        height="0.9em"
                        style={{ fill: 'rgb(46, 61, 80)' }}
                      >
                        <path d="M21.75 0H2.25A2.257 2.257 0 0 0 0 2.25v19.5A2.257 2.257 0 0 0 2.25 24h19.5A2.257 2.257 0 0 0 24 21.75V2.25A2.257 2.257 0 0 0 21.75 0zM9 19.5H6V9h3zm-1.5-12C6.67 7.5 6 6.83 6 6s.67-1.5 1.5-1.5S9 5.17 9 6s-.67 1.5-1.5 1.5zm12 12h-3v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6h-3V9h3v1.861C14.119 10.013 15.066 9 16.125 9c1.866 0 3.375 1.678 3.375 3.75z" />
                      </svg>
                    )}

                    {personalWebsite}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  }
};

export default InformationSection;
