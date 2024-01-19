/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */

'use client';

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { getJobById } from '@/app/job/jobServices';
import Link from 'next/link';
import ApplyJobModal from '@/app/components/Modal/ApplyJobModal';
import { getCoverLetters, getResumes } from '@/app/utils/indexService';
import ApplyJobModalV2 from '@/app/components/Modal/ApplyJobModalV2';
import getCoverLetter from './getCoverLetter';
import SuccessJob from '@/app/components/Modal/SuccessJob';
import { Dialog, Transition } from '@headlessui/react';

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    console.log('handleSuccess');
    // setIsSuccess(true);
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }

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
      console.log('fetchedCoverLetter: ', fetchedCoverLetter);
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
    }
    fetchCoverletters();

    fetchCoverletter();
  }, []);
  const cvIdReal = coverLetter?.cvId;
  const jobLink = `/job/${jobIdParam}`;
  const handleApplyJob = () => {
    console.log('Apply this job now');
  };
  console.log('Cover123: ', coverLetter);

  const router = useRouter();
  const handleViewApply = () => {
    console.log('View you resume');
    router.push('/job/application');
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
                    className="mb-10"
                    style={{ marginLeft: 0 }}
                    message="Informational Notes"
                    description={`You are in processing of creating a new cover letter for a specific job. ${data?.title} at ${data?.companyName}`}
                    type="info"
                    action={
                      <Space direction="vertical" className="ml-2">
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
                      </Space>
                    }
                    showIcon
                  />
                )}

                <div className="" style={{ minWidth: 210, minHeight: 297 }}>
                  <CoverLetterPreview ref={cvLayoutRef} coverLetterId={params.id} />
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Successful
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Your apply has been save successfully.
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleViewApply}
                              >
                                View you apply
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
                {/* <SuccessJob isSuccess={isSuccess} /> */}
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
