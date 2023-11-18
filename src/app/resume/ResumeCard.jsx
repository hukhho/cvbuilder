/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Divider, Space } from 'antd';
import { Popover, Switch } from '@headlessui/react';
import UserLayout from '../components/Layout/UserLayout';
import UserHeader from '../components/UserHeader';
import CVCard from '../components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
import { getResumes } from '../utils/indexService';
import FinishUpPreview from './[id]/finishup/FinishUpPreview';
import Meta from 'antd/es/card/Meta';
import './namebadge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faCogs,
  faCopy,
  faEdit,
  faEllipsisV,
  faSearch,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';
// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  color: black;
`;
const ResumeCard = ({ resume }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Card
      className="bg-white "
      cover={
        <div
          className="relative group"
          style={{ width: '240px', height: '240px', overflow: 'hidden' }}
        >
          <div className="w-full h-full opacity-100 group-hover:opacity-50 transition-opacity">
            <Link href={`/resume/${resume.id}/contact`} passHref legacyBehavior>
              <RedLink>
                  <FinishUpPreview cvId={resume.id} />
              </RedLink>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-opacity-75 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full ">
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full ">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full ">
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      }
      style={{ width: '240px', height: '320px' }}
    >
      <Space.Compact block>
        <span className="" style={{ width: '90%', fontWeight: 700, fontSize: 16 }}>
          {resume.resumeName}
        </span>
        <Popover className="relative">
          <Popover.Button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </Popover.Button>
          <Popover.Panel className="absolute z-10">
            <Card>
              <div className="flex flex-col" style={{ color: '#565656' }}>
                <Space align="center">
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </Space>
                <Space align="center">
                  <FontAwesomeIcon icon={faCopy} />
                  Duplicate
                </Space>
                <Space align="center">
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete
                </Space>
              </div>
              <Divider />
              <Space align="center">
                <FontAwesomeIcon icon={faSearch} />
                Searchable
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </Space>
            </Card>
          </Popover.Panel>
        </Popover>
      </Space.Compact>
    </Card>
  );
};
export default ResumeCard;