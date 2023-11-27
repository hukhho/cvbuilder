import { HeartOutlined } from '@ant-design/icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Card, Divider, Typography } from 'antd';
import Image from 'next/image';
import React from 'react';

const { Title } = Typography;

const JobCard = ({ job }) => {
  return (
    <div style={{ width: 1000, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Button>View CV</Button>
      </div>
      <div className="flex">
        <div>
          <Avatar src={job?.avatar} size={100} alt="Picture of the job" />
        </div>
        <div className="ml-4" style={{ textAlign: 'left' }}>
          <Title level={5} style={{ color: '#4D70EB' }}>
            {job?.name}
          </Title>
          {/* <p>{job?.companyName}</p> */}
          <div className="mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBriefcase} />
              <span className="ml-2">
                {job?.jobTitle} at {job?.company}
              </span>
            </div>

            {/*            
            <div className="flex mt-4 space-x-4">
              <div
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
              </div>
            </div> */}
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
              {/* <span>{job?.createDate}</span> */}
            </div>
          </div>
        </div>
      </div>
      <div />
      <Divider />
    </div>
  );
};

export default JobCard;
