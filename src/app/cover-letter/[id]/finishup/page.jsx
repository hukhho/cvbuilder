/* eslint-disable import/no-unresolved */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Alert, Button, Card, ConfigProvider, Divider, Space } from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import UserCoverLetterBuilderHeader from '@/app/components/UserCoverLetterBuilderHeader';

import ExperienceForm from '@/app/components/Form/ExperienceForm';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponents/InformationSection';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponents/ExperiencesSection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import CoverLetterPreview from './CoverLetterPreview';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { getJobById } from '@/app/job/jobServices';
import Link from 'next/link';
import ApplyJobModal from '@/app/components/Modal/ApplyJobModal';
import { getCoverLetters, getResumes } from '@/app/utils/indexService';
import ApplyJobModalV2 from '@/app/components/Modal/ApplyJobModalV2';
import getCoverLetter from './getCoverLetter';
import SuccessJob from '@/app/components/Modal/SuccessJob';

export default function FinishUp({ params }) {
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontSize, setFontSize] = useState(9);
  const [zoom, setZoom] = useState(100);

  const [enabledCategories, setEnabledCategories] = useState({
    'FINISH UP': true,
  });
  const { avatar, email, userRole } = useStore();

  const cvId = params.id;

  const handleLineHeightChange = event => {
    setLineHeight(event.target.value);
  };

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
  };

  const handleZoomChange = event => {
    setZoom(event.target.value);
  };

  const cvLayoutRef = useRef(null);

  const handleDownloadButtonClick = () => {
    if (cvLayoutRef.current) {
      cvLayoutRef.current.CaptureScreenshot();
    }
  };

  const searchParams = useSearchParams();

  const jobIdParam = searchParams.get('jobId');
  const isApplyProcess = searchParams.get('isApplyProcess');

  console.log('jobIdParam: ', jobIdParam);
  console.log('isApplyProcess: ', isApplyProcess);

  const [data, setData] = useState();
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [coverLetter, setCoverLetter] = useState();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    console.log('handleSuccess');
    setIsSuccess(true);
  };

  const fetchDataJob = async () => {
    try {
      const fetchedDataFromAPI = await getJobById(jobIdParam);
      setData(fetchedDataFromAPI);
      console.log('Job', fetchedDataFromAPI);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const fetchResumes = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedResumes = await getResumes();
      setResumes(fetchedResumes);
    } catch (error) {
      console.error('There was an error fetching resumes', error);
    }
  };

  const fetchCoverletters = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedCoverLetters = await getCoverLetters();
      console.log('fetchedCoverLetters: ', fetchedCoverLetters);
      setCoverLetters(fetchedCoverLetters);
    } catch (error) {
      console.error('There was an error fetching coverletters', error);
    }
  };
  const fetchCoverletter = async () => {
    try {
      // Simulate fetching resumes (replace with your actual fetch logic)
      const fetchedCoverLetter = await getCoverLetter(params?.id);
      setCoverLetter(fetchedCoverLetter);
    } catch (error) {
      console.error('There was an error fetching coverletters', error);
    }
  };
  // async function fetchData() {
  //   try {
  //     const content2 = await getCoverLetter(coverLetterId);
  //     setContent({
  //       name: content2.user.name,
  //       address: content2.user.address,
  //       phone: content2.user.phone,
  //       email: content2.user.email,
  //       company: content2.user.company,
  //       content: content2.description,
  //     });
  //   } catch (error) {
  //     // Handle any errors that occur during the data fetch
  //     console.error('Error fetching data:', error);
  //   }
  // }
  const resumeOptions = resumes.map(resume => ({
    value: resume.id,
    label: resume.resumeName,
  }));

  const coverOptions = coverLetters.map(cover => ({
    value: cover.id,
    label: cover.title,
    metadata: cover,
  }));

  useEffect(() => {
    if (jobIdParam && isApplyProcess) {
      fetchDataJob();
      fetchResumes();
      fetchCoverletters();
      fetchCoverletter();
    }
  }, []);
  const cvIdReal = coverLetter?.cvId;
  const jobLink = `/job/${jobIdParam}`;
  const handleApplyJob = () => {
    console.log('Apply this job now');
  };
  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={
            <UserCoverLetterBuilderHeader
              jobIdParam={jobIdParam || null}
              isApplyProcess={isApplyProcess || false}
              coverLetterTitle={coverLetter?.title}
              coverLetterId={cvId}
              initialEnabledCategories={enabledCategories}
            />
          }
          content={
            <div className="flex">
              <div className="mr-2 flex flex-col" style={{}}>
                {isApplyProcess && (
                  <Alert
                    className="mb-10 ml-5"
                    message="Informational Notes"
                    description={`You are in processing of creating a new cover letter for a specific job. ${data?.title} at ${data?.companyName}`}
                    type="info"
                    action={
                      <Space direction="vertical">
                        {/* <Button size="small" type="primary" onClick={handleApplyJob}>
                          Apply this job now
                        </Button> */}
                        <ApplyJobModalV2
                          resumeOptions={resumeOptions}
                          coverOptions={coverOptions}
                          cvId={cvIdReal}
                          coverLetterId={params.id}
                          jobId={jobIdParam}
                          jobTitle={data?.title}
                          handleSuccess={handleSuccess}
                        />
                        <SuccessJob isSuccess={isSuccess} />
                      </Space>
                    }
                    showIcon
                  />
                )}
                <div className="">
                  <CoverLetterPreview ref={cvLayoutRef} coverLetterId={params.id} />
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
