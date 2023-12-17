import { HeartOutlined } from '@ant-design/icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Card, Divider, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const { Title } = Typography;

const JobCard = ({ job }) => {
  const candidateId = job?.id || 8;
  return (
    <div style={{ width: 1000, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Link href={`/hr/preview/${candidateId}`} passHref>
          <Button>View CV</Button>
        </Link>
      </div>
      <div className="flex">
        <div>
          <Avatar src={job?.avatar} size={100} alt="Picture of the job" />
        </div>
        <div className="ml-4" style={{ textAlign: 'left' }}>
          <Title level={5} style={{ color: '#4D70EB' }}>
            {job?.name}
          </Title>
          <div className="mt-4">
            {job?.jobTitle && (
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBriefcase} />
                <span className="ml-2">
                  {}
                  {job?.jobTitle} {job?.company ? <> at </> : null} {job?.company}
                </span>
              </div>
            )}
            <div className="flex mt-4 items-centers">
              <div>
                {job?.jobTitle && (
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 4V7L9 8"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span>{job?.about}</span>
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
