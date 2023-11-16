/* eslint-disable import/no-unresolved */

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { getAudit, getFinishUp, syncUp } from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';

const DEFAULT_TOOLBAR = {
  fontSize: '9pt',
  lineHeight: 1.4,
  fontFamily: 'Merriweather',
  fontWeight: 'normal',
  zoom: '100%',
  paperSize: 'letter',
  hasDivider: true,
  hasIndent: false,
  fontColor: 'rgb(0, 0, 0)',
};

const DEFAULT_TEMPLATE = 'classical';

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

  const [templateSelected, setTemplateSelected] = useState(DEFAULT_TEMPLATE);
  const [toolbarState, setToolbarState] = useState(DEFAULT_TOOLBAR);

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

  const sections = useMemo(
    () => [
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
        component: (
          <SummarySection
            layoutStyles={toolbarState}
            templateType={templateSelected}
            summary={summary}
          />
        ),
        canBeDrag: true, // Set to true if this section can be dragged
        canBeDisplayed: true,
      },
      {
        id: 'experiences',
        component: (
          <ExperiencesSection
            templateType={templateSelected}
            experiences={experiences}
            layoutStyles={toolbarState}
            onChangeOrder={sortedExperiences => {
              // You can perform any necessary actions with the sorted experiences here.
            }}
          />
        ),
        canBeDrag: true, // Set to true if this section can be dragged
        canBeDisplayed: experiences !== null,
      },
      {
        id: 'educations',
        component: (
          <EducationsSection
            layoutStyles={toolbarState}
            templateType={templateSelected}
            educations={educations}
          />
        ),
        canBeDrag: true, // Set to true if this section can be dragged
        canBeDisplayed: educations !== null,
      },
      {
        id: 'skills',
        component: (
          <SkillsSection
            layoutStyles={toolbarState}
            templateType={templateSelected}
            skills={skills}
            onChangeOrder={handleSkillsOrderChange}
          />
        ),
        canBeDrag: true, // Set to true if this section can be dragged
        canBeDisplayed: skills !== null,
      },
    ],
    [toolbarState, templateSelected],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvId = params.id;
        const data = await getFinishUp(cvId);
        console.log('🚀 ~ file: page.jsx:330 ~ fetchData ~ data:', data);

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

      const fetchData = async () => {
        try {
          const data = await getFinishUp(cvId123);

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
      cvLayoutRef.current.captureScreenshot();
    }
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
                <div className="mr-2 flex flex-col flex-1">
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
                    style={{
                      background: 'white',
                      width: '100%',
                    }}
                  >
                    <div>
                      <FinishupToolbar
                        handleChangeTemplateSelected={value => setTemplateSelected(value)}
                        handleOpenModal={() => setOpen(true)}
                        toolbarState={toolbarState}
                        onToolbarChange={handleToolbarChange}
                        currentTemplate={DEFAULT_TOOLBAR}
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
                  <div
                    style={{
                      background: 'white',
                      width: '100%',
                    }}
                  >
                    <CVLayout
                      ref={cvLayoutRef}
                      key={[templateSelected, toolbarState]}
                      layoutStyles={toolbarState}
                      sectionsOrder={sectionsOrder}
                      onSectionsOrderChange={handleSectionsOrderChange}
                    >
                      {sections.map(section => section.canBeDisplayed && section.component)}
                    </CVLayout>
                  </div>
                </div>
              )}
              {showFinishupCV && (
                <div
                  className="flex flex-col items-start ml-auto"
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
                  <div style={{ color: 'black', textAlign: 'left' }}>
                    <div className="keyword-card card share-card ">
                      <div className="keyword-wrapper">
                        <div className="keyword-side">
                          <h4>
                            <span className="uppercase" style={{ color: 'black' }}>
                              AI Keyword Targeting
                            </span>
                            <sup
                              aria-hidden="true"
                              style={{ paddingLeft: 4, color: 'rgb(204, 204, 204)' }}
                            >
                              v2
                            </sup>
                          </h4>
                        </div>
                        <div style={{}} className="keyword-list">
                          <span className="keyword-infos">
                            Want to improve your chances of getting this role? Consider adding the
                            following keywords to your resume:
                          </span>
                          <div>
                            <div>
                              <span>
                                java <i className="fas fa-times" aria-hidden="true" />
                              </span>
                              <span>
                                <i className="fas fa-circle" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="keyword-button button">Update job description</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
