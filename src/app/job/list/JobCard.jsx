import { HeartOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const { Title } = Typography;

const JobCard = ({ job }) => {
  console.log('JobCard: ', job);
  return (
    <Card style={{ width: 550, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <HeartOutlined />
      </div>
      <div className="flex">
        <div>
          <Image src="/images/grab.png" width={60} height={60} alt="Picture of the job" />
        </div>
        <div className="ml-4" style={{ textAlign: 'left' }}>
          <Title level={5} style={{ color: '#4D70EB' }}>
            {job?.title}
          </Title>
          <p>{job?.companyName}</p>
          <div className="mt-4">
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.48615 13.7175C0.702344 7.95788 0 7.36676 0 5.25C0 2.3505 2.23857 0 5 0C7.76143 0 10 2.3505 10 5.25C10 7.36676 9.29766 7.95788 5.51385 13.7175C5.26555 14.0942 4.73443 14.0941 4.48615 13.7175ZM5 7.4375C6.1506 7.4375 7.08333 6.45813 7.08333 5.25C7.08333 4.04187 6.1506 3.0625 5 3.0625C3.8494 3.0625 2.91667 4.04187 2.91667 5.25C2.91667 6.45813 3.8494 7.4375 5 7.4375Z"
                  fill="black"
                />
              </svg>
              <span className="ml-2">{job?.location}</span>
            </div>
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 4.375H2.5C1.80964 4.375 1.25 4.93464 1.25 5.625V11.875C1.25 12.5654 1.80964 13.125 2.5 13.125H12.5C13.1904 13.125 13.75 12.5654 13.75 11.875V5.625C13.75 4.93464 13.1904 4.375 12.5 4.375Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.125V3.125C10 2.79348 9.8683 2.47554 9.63388 2.24112C9.39946 2.0067 9.08152 1.875 8.75 1.875H6.25C5.91848 1.875 5.60054 2.0067 5.36612 2.24112C5.1317 2.47554 5 2.79348 5 3.125V13.125"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="ml-2">Full-time</span>
            </div>
            <div className="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0.666748V15.3334"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.3333 3.33325H6.33333C5.71449 3.33325 5.121 3.57908 4.68342 4.01667C4.24583 4.45425 4 5.04775 4 5.66659C4 6.28542 4.24583 6.87892 4.68342 7.3165C5.121 7.75409 5.71449 7.99992 6.33333 7.99992H9.66667C10.2855 7.99992 10.879 8.24575 11.3166 8.68334C11.7542 9.12092 12 9.71441 12 10.3333C12 10.9521 11.7542 11.5456 11.3166 11.9832C10.879 12.4208 10.2855 12.6666 9.66667 12.6666H4"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div>
                <span className="ml-2">{job?.salary}</span>
              </div>
            </div>

            <div className="flex mt-4 space-x-4">
              <div
                style={{ width: '100px', textAlign: 'center' }}
                className="border-gray-500 border rounded-full p-1"
              >
                {job?.skill}
              </div>
              {/* <div
                style={{ width: '100px', textAlign: 'center' }}
                className="border-gray-500 border rounded-full p-1"
              >
                Back-end
              </div>
              <div
                style={{ width: '100px', textAlign: 'center' }}
                className="border-gray-500 border rounded-full p-1"
              >
                C#
              </div> */}
            </div>
            <div className="flex mt-4 items-centers">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 4V7L9 8"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span>{job?.createDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div />
    </Card>
  );
};

export default JobCard;
