/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Divider, Space } from 'antd';
import { Popover, Switch } from '@headlessui/react';
import UserLayout from '../components/Layout/UserLayout';
import UserHeader from '../components/UserHeader';
import CVCard from '../components/Card/CVCard';
import Link from 'next/link'; // Import Link from Next.js for navigation
// import { deleteResume, duplicateResume, getResumes } from '../utils/indexService';
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
import UpdateResume from '../components/Modal/UpdateResume';
import CoverLetterCard from './[id]/finishup/CoverLetterCard';
import UpdateCoverLetter from '../components/Modal/UpdateCoverLetter';
import { deleteCoverLetter } from './coverLetterService';
// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  color: black;
`;
const CoverLetterCardComponents = ({ onDeleted, resume }) => {
  const [enabled, setEnabled] = useState(false);

  const [isUpdateResumeOpen, setIsUpdateResumeOpen] = useState(false);

  const openUpdateResumeModal = () => {
    setIsUpdateResumeOpen(true);
  };

  const closeUpdateResumeModal = () => {
    setIsUpdateResumeOpen(false);
  };

  const handleDeleteResume = async cvId => {
    try {
      await deleteCoverLetter(cvId);
      onDeleted();
    } catch (error) {
      console.log('handleDeleteResume');
    }
  };
  const handleDuplicateResume = async cvId => {
    try {
      // await duplicateResume(cvId);
      onDeleted();
    } catch (error) {
      console.log('handleDeleteResume');
    }
  };
  return (
    <Card
      className="bg-white "
      cover={
        <div
          className="relative group"
          style={{ width: '240px', height: '240px', overflow: 'hidden' }}
        >
          <UpdateCoverLetter
            isOpen={isUpdateResumeOpen}
            onOpenModal={closeUpdateResumeModal}
            onClose={closeUpdateResumeModal}
            resume={resume}
            onCreated={() => {
              console.log('update');
            }}
          />
          <div className="w-full h-full opacity-100 group-hover:opacity-50 transition-opacity">
            <Link
              href={`/cover-letter/${resume.id}/contact`}
              passHref
              legacyBehavior
              style={{ pointerEvents: 'none' }} // Disable pointer events for the link
            >
              <RedLink>
                <CoverLetterCard coverLetterId={resume.id} />
              </RedLink>
            </Link>
          </div>
          <div className="z-10 absolute bottom-0 left-0 right-0 bg-opacity-75 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={event => {
                event.preventDefault(); // Prevent link from being followed
                openUpdateResumeModal();
              }}
              className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full "
            >
              <FontAwesomeIcon icon={faCog} />
            </button>
            <button
              onClick={() => handleDeleteResume(resume.id)}
              className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full "
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {/* <button
              onClick={() => handleDuplicateResume(resume.id)}
              className="px-4 py-2 text-white bg-gray-300 hover:bg-blue-500 rounded-full "
            >
              <FontAwesomeIcon icon={faCopy} />
            </button> */}
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
                  <button onClick={openUpdateResumeModal}>
                    <div className="flex">
                      <FontAwesomeIcon icon={faEdit} />
                      <div className="ml-4" style={{ marginTop: -3 }}>
                        Edit
                      </div>
                    </div>
                  </button>

                  {/* <button onClick={openUpdateResumeModal}></button> */}
                </Space>
             
                <Space align="center">
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete
                </Space>
              </div>
              <Divider />
              
            </Card>
          </Popover.Panel>
        </Popover>
      </Space.Compact>
    </Card>
  );
};
export default CoverLetterCardComponents;
