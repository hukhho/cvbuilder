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
// import './expert.css';
// import './gen.css';
// import './version.css';
import InvolvementSection from '@/app/components/Templates/SectionComponents/InvolvementsSection';
import ProjectSection from '@/app/components/Templates/SectionComponents/ProjectSection';
import CertificationSection from '@/app/components/Templates/SectionComponents/CertificationSection';
import Link from 'next/link';
import HeaderHR from '@/app/components/HeaderHR';
import { getFinishUp } from '@/app/expert/view-cv/[id]/finishUpService';
import { getHistoryFinishUp } from '@/app/utils/indexService';
import UserLayout from '@/app/components/Layout/UserLayout';
import UserHeaderJob from '@/app/components/UserHeaderJob';

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
    'MY APPLICATION': true,
  });
  const { avatar, email, userRole } = useStore();

  const [templateSelected, setTemplateSelected] = useState(mockData.data.resume.templateType);
  const [toolbarState, setToolbarState] = useState(mockData.data.resume.resumeStyle);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
    let newFinishUpData = { ...finishUpData };
    newFinishUpData.cvStyle = toolbarState;
    setFinishUpData(newFinishUpData);
  }, [toolbarState]);

  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};

  const filteredEducations = educations?.filter(education => education.isDisplay === true);
  const filteredProjects = projects?.filter(project => project.isDisplay === true);
  const filteredInvolvements = involvements?.filter(involvement => involvement.isDisplay === true);
  const filteredCertifications = certifications?.filter(
    certification => certification.isDisplay === true,
  );
  const filteredSkills = skills?.filter(skill => skill.isDisplay === true);
  const filteredExperiences = experiences?.filter(experience => experience.isDisplay === true);

  // Now you have filtered arrays for each category
  console.log(filteredEducations);
  console.log(filteredProjects);
  console.log(filteredInvolvements);
  console.log(filteredCertifications);
  console.log(filteredSkills);
  console.log(filteredExperiences);

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

  const componentIDs = {
    experience: {},
    education: {},
    // Add other types here
  };
  const handleRoleChange = (type, typeId, newRole) => {
    console.log('handleRoleChange newRole', newRole, type, typeId);
    switch (type) {
      case 'experience':
        console.log('handleRoleChange newRole experience', newRole, type, typeId);
        const updatedExperiences = experiences.map(experience => {
          if (experience.id === typeId) {
            return {
              ...experience,
              role: newRole,
            };
          } else {
            return experience;
          }
        });
        console.log('updatedExperiences experience', updatedExperiences);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.experiences = updatedExperiences;

        setFinishUpData(newFinishUpData);
        console.log('New finishup data after updatedExperiences:', newFinishUpData);
    }
  };
  const handleOrgNameChange = (type, typeId, newData) => {
    console.log('handleOrgNameChange newData', newData, type, typeId);
    switch (type) {
      case 'experience':
        console.log('handleOrgNameChange newData experience', newData, type, typeId);
        const updatedExperiences = experiences.map(experience => {
          if (experience.id === typeId) {
            return {
              ...experience,
              companyName: newData,
            };
          } else {
            return experience;
          }
        });
        console.log('updatedExperiences experience', updatedExperiences);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.experiences = updatedExperiences;

        setFinishUpData(newFinishUpData);
        console.log('New finishup data after updatedExperiences:', newFinishUpData);
    }
  };
  const handleDescriptionChange = (type, typeId, newData) => {
    console.log('handleOrgNameChange newData', newData, type, typeId);
    switch (type) {
      case 'experience':
        console.log('handleOrgNameChange newData experience', newData, type, typeId);
        const updatedExperiences = experiences.map(experience => {
          if (experience.id === typeId) {
            return {
              ...experience,
              description: newData,
            };
          } else {
            return experience;
          }
        });
        console.log('updatedExperiences experience', updatedExperiences);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.experiences = updatedExperiences;

        setFinishUpData(newFinishUpData);
        console.log('New finishup data after updatedExperiences:', newFinishUpData);
    }
  };
  const handleSummaryChange = newData => {
    let newFinishUpData = { ...finishUpData };
    newFinishUpData.summary = newData;

    setFinishUpData(newFinishUpData);
    console.log('New finishup data after handleSummaryChange:', newFinishUpData);
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
      component: (
        <SummarySection
          templateType={templateSelected}
          summary={summary}
          handleSummaryChange={handleSummaryChange}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: true,
    },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          templateType={templateSelected}
          experiences={filteredExperiences}
          onChangeOrder={sortedExperiences => {
            for (let i = 0; i < sortedExperiences.length; i++) {
              sortedExperiences[i].theOrder = i + 1;
            }
            console.log('Finishup data:', finishUpData);
            let newFinishUpData = { ...finishUpData };
            newFinishUpData.experiences = sortedExperiences;

            setFinishUpData(newFinishUpData);
            console.log('New finishup data:', newFinishUpData);
          }}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredExperiences !== null,
    },
    {
      id: 'educations',
      component: (
        <EducationsSection templateType={templateSelected} educations={filteredEducations} />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredEducations !== null,
    },
    {
      id: 'involvements',
      component: (
        <InvolvementSection templateType={templateSelected} involvements={filteredInvolvements} />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredInvolvements !== null,
    },
    {
      id: 'projects',
      component: <ProjectSection templateType={templateSelected} projects={filteredProjects} />,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredProjects != null,
    },
    {
      id: 'certifications',
      component: (
        <CertificationSection
          templateType={templateSelected}
          certifications={filteredCertifications}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredCertifications !== null,
    },
    {
      id: 'skills',
      component: (
        <SkillsSection
          templateType={templateSelected}
          skills={filteredSkills}
          onChangeOrder={handleSkillsOrderChange}
          canBeDisplayed={filteredSkills !== null}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredSkills !== null,
    },
  ];

  const filteredSections = sections.filter(section => {
    if (section.id === 'educations') {
      return filteredEducations && filteredEducations.length > 0;
    } else if (section.id === 'experiences') {
      return filteredExperiences && filteredExperiences.length > 0;
    } else if (section.id === 'projects') {
      return filteredProjects && filteredProjects.length > 0;
    } else if (section.id === 'involvements') {
      return filteredInvolvements && filteredInvolvements.length > 0;
    } else if (section.id === 'certifications') {
      return filteredCertifications && filteredCertifications.length > 0;
    } else if (section.id === 'skills') {
      return filteredSkills && filteredSkills.length > 0;
    } else if (section.id === 'summary') {
      return summary && summary !== null && summary.trim() !== ''; // Include if 'summary' is not null and not an empty string
    }
    return true; // Include other sections by default
  });

  // 'filteredSections' now contains only sections where 'educations' is not null, undefined, and has a length greater than 0, and 'projects' has a length greater than 0

  // 'filteredSections' now contains only sections where 'educations' is not null, undefined, and has a length greater than 0, and 'projects' has a length greater than 0
  console.log('filteredSections: ', filteredSections);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvId = params.id;
        const fetched = await getHistoryFinishUp(cvId);
        const data = fetched.cvBody;
        console.log('FinishUp data.cvBody: ', data);

        setFinishUpData(data);

        setShowFinishupCV(true);

        setTemplateSelected(data.templateType);
        setToolbarState(data.cvStyle);

        setSummary(data.summary);

        // const data1 = await getAudit(cvId);
        // setAuditData(data1);
      } catch (error) {
        console.error('Error fetching FinishUp data:', error);
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const cvLayoutRef = useRef(null);

  const handleDownloadButtonClick = () => {
    if (cvLayoutRef.current) {
      cvLayoutRef.current.CaptureScreenshot();
    }
  };

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed={true}
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={<UserHeaderJob initialEnabledCategories={enabledCategories} />}
          content={
            <div className="flex">
              {showFinishupCV && (
                <div className="mr-2 flex flex-col">
                  <div>
                    <div style={{ width: '895px' }}>
                      <div className="flex" style={{ justifyItems: 'center' }}>
                        <Link href={'/job/application'} passHref>
                          <button
                            style={{
                              width: '120px',
                              height: '30px',
                              marginTop: '50px',
                              marginLeft: '10px',
                              marginBottom: '10px',
                            }}
                            className="button"
                            type=""
                          >
                            Back to list
                          </button>
                        </Link>
                        <button
                          style={{
                            width: '60px',
                            height: '30px',
                            marginTop: '50px',
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
                    {filteredSections.map(section => section.canBeDisplayed && section.component)}
                  </CVLayout>
                </div>
              )}
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
