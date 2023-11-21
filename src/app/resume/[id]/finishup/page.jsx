/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Divider, Modal } from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponents/InformationSection';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponents/ExperiencesSection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import { getAudit, getFinishUp, getVersionsList, syncUp } from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import './version.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';
import Ats from './Ats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faTimes } from '@fortawesome/free-solid-svg-icons';

const mockData = {
  data: {
    resume: {
      id: 1,
      fullName: 'Pham Viet Thuan Thien',
      phone: 'xxxxxxxxxx',
      personalWebsite: 'bcbcc .cyd',
      emailAddress: 'pvtt@gmail.com',
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      templateType: 'classical',
      resumeStyle: {
        fontSize: '9pt',
        lineHeight: 1.4,
        fontFamily: 'Merriweather',
        fontWeight: 'normal',
        zoom: '100%',
        paperSize: 'letter',
        hasDivider: true,
        hasIndent: false,
        fontColor: 'rgb(0, 0, 0)',
      },
      experiences: [
        {
          id: 1,
          companyName: 'Holistics',
          role: 'Product Manager',
          startDate: '04 Aug',
          endDate: '04 Dec',
          location: 'Ho Chi Minh',
          description:
            '• Responsible for dashboard validation, metadata, and human factor projects within the Holistics platform',
        },
        {
          id: 2,
          companyName: 'Momo',
          role: 'Product Manager',
          startDate: '',
          endDate: '',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 3,
          companyName: 'VNG',
          role: 'Dev',
          startDate: '',
          endDate: '',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      educations: [
        {
          id: 1,
          degree: 'Bachelor of Engineering',
          collegeName: 'FPT University',
          startDate: '',
          endDate: '',
          location: 'Ho Chi Minh',
          gpa: '3.2/4',
          minor: 'AI',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      projects: [
        {
          id: 1,
          organizations: 'Holistics',
          title: 'Product Manager',
          startDate: '',
          endDate: '',
          projectUrl: 'random.org',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          organizations: 'Momo',
          title: 'Product Manager',
          startDate: '',
          endDate: '',
          projectUrl: 'random.org',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      certifications: [
        {
          id: 1,
          certificationSource: 'Holistics',
          name: 'Product Manager',
          certificationRelevance: 1,
          endYear: '2023',
        },
        {
          id: 2,
          certificationSource: 'Momo',
          name: 'UX design',
          certificationRelevance: 1,
          endYear: '2023',
        },
      ],
      skills: [
        {
          id: 1,
          name: 'CSS',
          description: 'CSS',
        },
        {
          id: 2,
          name: 'HTML',
          description: 'CSS',
        },
        {
          id: 3,
          name: 'React',
          description: 'CSS',
        },
        {
          id: 4,
          name: 'Vue',
          description: 'CSS',
        },
      ],
      involvements: [
        {
          id: 1,
          organizationName: 'Holistics',
          organizationRole: 'Product Manager',
          startDate: '',
          endDate: '',
          projectUrl: 'random.org',
          college: 'FPT University',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          organizationName: 'Momo',
          organizationRole: 'Product Manager',
          startDate: '',
          endDate: '',
          college: 'FPT University',
          projectUrl: 'random.org',
          location: 'Ho Chi Minh',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
  },
  status: true,
};

export default function FinishUp({ params }) {
  const [finishUpData, setFinishUpData] = useState(null);
  const [auditData, setAuditData] = useState(null);

  const [templateData, setTemplateData] = useState(null);
  const [showFinishupCV, setShowFinishupCV] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState({
    'FINISH UP': true,
  });

  // useEffect(() => {
  //   setShowFinishupCV(false);
  // }, []);

  const [templateSelected, setTemplateSelected] = useState(mockData.data.resume.templateType);
  const [toolbarState, setToolbarState] = useState(mockData.data.resume.resumeStyle);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
  }, [toolbarState]);

  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};

  // to store order of some user's information
  const [experiencesOrder, setExperiencesOrder] = useState([]);
  const [educationsOrder, setEducationsOrder] = useState([]);
  const [skillsOrder, setSkillsOrder] = useState([]);
  const [summary, setSummary] = useState();

  const handleExperiencesOrderChange = newOrder => {
    setExperiencesOrder(newOrder);
  };

  const handleEducationsOrderChange = useCallback(newOrder => {
    setEducationsOrder(newOrder);
  }, []);

  const handleSkillsOrderChange = useCallback(newOrder => {
    setSkillsOrder(newOrder);
  }, []);

  // to store order of template

  const [sectionsOrder, setSectionsOrder] = useState([]);

  const handleSectionsOrderChange = newOrder => {
    setSectionsOrder(newOrder);
  };

  const handleToolbarChange = values => {
    setToolbarState(values);
  };

  const sections = [
    {
      id: 'information',
      component: (
        <InformationSection
          canBeDrag={false}
          templateType={templateSelected}
          userInfo={finishUpData}
          layoutStyles={toolbarState}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: true,
    },
    {
      id: 'summary',
      component: <SummarySection templateType={templateSelected} summary={summary} />,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: true,
    },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          templateType={templateSelected}
          experiences={experiences}
          onChangeOrder={sortedExperiences => {
            console.log('New order of experiences:', sortedExperiences);
            // You can perform any necessary actions with the sorted experiences here.
          }}
        />
      ),
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: experiences !== null,
    },
    {
      id: 'educations',
      component: <EducationsSection templateType={templateSelected} educations={educations} />,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: educations !== null,
    },
    {
      id: 'skills',
      component: (
        <SkillsSection
          templateType={templateSelected}
          skills={skills}
          onChangeOrder={handleSkillsOrderChange}
        />
      ),
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: skills !== null,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvId = params.id;
        const data = await getFinishUp(cvId);

        console.log('FinishUp data: ', data);

        setFinishUpData(data);

        setShowFinishupCV(true);

        setTemplateSelected(data.templateType);
        setToolbarState(data.cvStyle);

        setSummary(data.summary);

        const data1 = await getAudit(cvId);
        setAuditData(data1);
      } catch (error) {
        console.error('Error fetching FinishUp data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSyncUp = async () => {
    try {
      const cvId123 = params.id;
      setShowFinishupCV(false);

      await syncUp(cvId123); // Call the syncUp function
      console.log('Synchronization completed.');

      const fetchData = async () => {
        try {
          const data = await getFinishUp(cvId123);
          console.log('FinishUp data: ', data);

          setFinishUpData(data);

          setShowFinishupCV(true);

          setTemplateSelected(data.templateType);
          setToolbarState(data.cvStyle);

          setSummary(data.summary);
        } catch (error) {
          console.error('Error fetching FinishUp data:', error);
        }
      };

      fetchData();
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };
  //   <div style={{ marginBottom: '12px' }}>
  //   <Button onClick={handleSyncUp}>Sync Up</Button>
  // </div>

  const [open, setOpen] = useState(false);
  const cvLayoutRef = useRef(null);

  const handleDownloadButtonClick = () => {
    if (cvLayoutRef.current) {
      cvLayoutRef.current.CaptureScreenshot();
    }
  };

  const [isShowVersion, setIsShowVersion] = useState(false);
  const [versions, setVersions] = useState();
  const handleShowVersion = async () => {
    setIsShowVersion(true);
    const result = await getVersionsList(params.id);
    setVersions(result);
    console.log('version::result: ', result);
  };
  const handleHideVersion = () => {
    setIsShowVersion(false);
  };
  const handleChooseVersion = versionId => {
    console.log('versionId: ', versionId);
  };
  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex">
              {showFinishupCV && (
                <div className="mr-2 flex flex-col">
                  {/* <Button type="primary" onClick={() => setOpen(true)}>
                    Open Modal of 1000px width
                  </Button> */}
                  <Modal
                    title=""
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    className="custom"
                  >
                    <ScoreFinishUp data={auditData} />
                  </Modal>
                  <div
                    style={
                      {
                        // background: 'white',
                        // width: '100%',
                      }
                    }
                  >
                    <div style={{ width: '895px' }}>
                      <FinishupToolbar
                        handleChangeTemplateSelected={value => setTemplateSelected(value)}
                        handleOpenModal={() => setOpen(true)}
                        toolbarState={toolbarState}
                        onToolbarChange={handleToolbarChange}
                        currentTemplate={mockData.data.resume.resumeStyle}
                      />
                      <div className="flex" style={{ justifyItems: 'center' }}>
                        <button
                          style={{
                            width: '60px',
                            height: '30px',
                            marginTop: '10px',
                            marginBottom: '10px',
                          }}
                          className="button"
                          type=""
                          onClick={() => handleSyncUp()}
                        >
                          Sync Up
                        </button>
                        <button
                          style={{
                            width: '60px',
                            height: '30px',
                            marginTop: '10px',
                            marginLeft: '10px',
                            marginBottom: '10px',
                          }}
                          className="button"
                          type=""
                          onClick={() => handleDownloadButtonClick()}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                  <CVLayout
                    ref={cvLayoutRef}
                    key={[templateSelected, toolbarState]}
                    templateType={templateSelected}
                    layoutStyles={toolbarState}
                    sectionsOrder={sectionsOrder}
                    onSectionsOrderChange={handleSectionsOrderChange}
                  >
                    {sections.map(section => section.canBeDisplayed && section.component)}
                  </CVLayout>
                </div>
              )}
              {showFinishupCV && (
                <div
                  className="flex flex-col items-start"
                  style={{ position: 'static', width: '360px' }}
                >
                  <div className="">
                    <div style={{ marginLeft: '14px', maxHeight: '185px' }}>
                      <VideoComponent />
                    </div>
                  </div>
                  <div className="">
                    <div
                      className="askForReview card share-card"
                      style={{ color: 'black', textAlign: 'left' }}
                    >
                      <h4>Rezi Expert Review</h4>
                      <span>
                        We'll correct all formatting, content, and grammar errors directly in your
                        resume
                      </span>
                      <button
                        href=""
                        data-size="default"
                        data-theme="default"
                        data-busy="false"
                        className=" button "
                      >
                        Ask for Rezi Expert Review
                      </button>
                    </div>
                  </div>
                  <Ats cvId={params.id} />

                  <button
                    onClick={handleShowVersion}
                    className="fixed z-50 right-0 bg-white pl-2 pr-1 py-2 border-l border-y border-gray-200 rounded-tl rounded-bl"
                  >
                    <FontAwesomeIcon icon={faHistory} />
                  </button>
                  {isShowVersion && (
                    <div className="templateSelector" data-dock="true">
                      <div className="drop-shadow selector">
                        <div className="header">
                          <div className="flex">
                            <h3>
                              <i className="fas fa-history mr-1" aria-hidden="true" /> Version
                              History
                              <sup className="ml-1 text-gray-400">beta</sup>
                            </h3>
                            <button onClick={handleHideVersion}>
                              {' '}
                              <FontAwesomeIcon className="close" icon={faTimes} />
                            </button>
                          </div>
                        </div>
                        <div className="selector-list">
                          <nav className="flex flex-col pt-4 space-y-6" aria-label="Progress">
                            <div className="flex flex-col space-y-3">
                              <ol role="list">
                                {versions?.map(version => (
                                  <li key={version.id} className="pb-10 relative">
                                    <div
                                      className="absolute left-2.5 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                      aria-hidden="true"
                                    />
                                    <a
                                      onClick={() => handleChooseVersion(version.id)}
                                      className="group relative flex items-center"
                                    >
                                      <span className="flex h-7 items-center">
                                        <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white border-rezi-blue">
                                          <span className="h-2.5 w-2.5 rounded-full bg-rezi-blue" />
                                        </span>
                                      </span>
                                      <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="flex flex-col text-sm font-medium">
                                          <span>{version.timestamp}</span>
                                        </span>
                                      </span>
                                    </a>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
