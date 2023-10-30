/* eslint-disable import/no-unresolved */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import { getFinishUp, syncUp } from './finishUpService';
import ScoreFinishUp from './Score';

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
        zoom: '130%',
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
        },
        {
          id: 2,
          name: 'HTML',
        },
        {
          id: 3,
          name: 'React',
        },
        {
          id: 4,
          name: 'Vue',
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

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex mt-8">
              {showFinishupCV && (
                <div
                  style={{
                    backgroundColor: 'rgba(243, 244, 246)',
                    borderRadius: '4px',
                  }}
                  className="w-2/3 mr-2 flex flex-col"
                >
                  <Button type="primary" onClick={() => setOpen(true)}>
                    Open Modal of 1000px width
                  </Button>

                  <Modal
                    title=""
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    className="custom"
                  >
                    <ScoreFinishUp />
                  </Modal>

                  <div
                    style={{
                      background: 'white',
                      width: '100%',
                    }}
                  >
                    <FinishupToolbar
                      handleChangeTemplateSelected={value => setTemplateSelected(value)}
                      toolbarState={toolbarState}
                      onToolbarChange={handleToolbarChange}
                      currentTemplate={mockData.data.resume.resumeStyle}
                    />
                  </div>
                  <CVLayout
                    key={[templateSelected, toolbarState]}
                    layoutStyles={toolbarState}
                    sectionsOrder={sectionsOrder}
                    onSectionsOrderChange={handleSectionsOrderChange}
                  >
                    {sections.map(section => section.canBeDisplayed && section.component)}
                  </CVLayout>
                </div>
              )}
              {showFinishupCV && (
                <div className="w-1/3 flex flex-col items-start">
                  <div className="h-1/3">
                    <p>
                      <Image
                        src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                        width={320}
                        height={182}
                        alt="Video"
                      />
                    </p>
                  </div>
                  <div className="h-1/3 ">
                    <h1>REZI EXPERT REVIEW</h1>
                    <p>
                      We'll correct all formatting, content, and grammar errors directly in your
                      resume
                    </p>
                    <Button
                      className="form-button w-full"
                      style={{
                        backgroundColor: 'rgb(77, 112, 235)',
                        color: 'white',
                      }}
                    >
                      ASK FOR REZI EXPERT REVIEW
                    </Button>
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
