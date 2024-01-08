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
import useStore from '@/store/store';
import CustomSections from '@/app/components/Templates/SectionComponents/CustomSection';

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

  const theOrders = {
    summary: 99,
    experiences: 99,
    educations: 99,
    involvements: 99,
    projects: 99,
    certifications: 99,
    skills: 99,
  };
  // const theOrders =  {
  //   summary: 2,
  //   experiences: 1,
  //   educations: 3,
  //   projects: 4,
  //   certifications: 5,
  //   involvements: 99,
  //   skills: 6
  // }
  const [theOrder, setTheOrder] = useState(theOrders);

  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};

    const filteredEducations = educations?.filter(education => {
    // Check if education is displayable (isDisplay is true)
    if (education.isDisplay !== true) {
      return false;
    }

    // Check if degree is not null
    if (education.degree === null || education.degree === undefined || education.degree === '') {
      return false;
    }

    // If both conditions are met, keep the education in the filtered list
    return true;
  });

  const filteredProjects = projects?.filter(project => {
    // Check if project is displayable (isDisplay is true)
    if (project.isDisplay !== true) {
      return false;
    }

    // Check if title is not null, undefined, or an empty string
    if (project.title === null || project.title === undefined || project.title === '') {
      return false;
    }

    // If both conditions are met, keep the project in the filtered list
    return true;
  });
  const filteredInvolvements = involvements?.filter(involvement => {
    // Check if involvement is displayable (isDisplay is true)
    if (involvement.isDisplay !== true) {
      return false;
    }

    // Check if organizationName is not null, undefined, or an empty string
    if (
      involvement.organizationName === null ||
      involvement.organizationName === undefined ||
      involvement.organizationName === ''
    ) {
      return false;
    }

    // If both conditions are met, keep the involvement in the filtered list
    return true;
  });
  const filteredCertifications = certifications?.filter(certification => {
    // Check if certification is displayable (isDisplay is true)
    if (certification.isDisplay !== true) {
      return false;
    }

    // Check if name is not null, undefined, or an empty string
    if (
      certification.name === null ||
      certification.name === undefined ||
      certification.name === ''
    ) {
      return false;
    }

    // If both conditions are met, keep the certification in the filtered list
    return true;
  });

  const filteredSkills = skills?.filter(skill => {
    // Check if skill is displayable (isDisplay is true)
    if (skill.isDisplay !== true) {
      return false;
    }

    // Check if description is not null, undefined, or an empty string
    if (skill.description === null || skill.description === undefined || skill.description === '') {
      return false;
    }

    // If both conditions are met, keep the skill in the filtered list
    return true;
  });
  const filteredExperiences = experiences?.filter(experience => {
    // Check if experience is displayable (isDisplay is true)
    if (experience.isDisplay !== true) {
      return false;
    }

    // Check if companyName is not null, empty string, or undefined
    if (
      experience.companyName === null ||
      experience.companyName === '' ||
      experience.companyName === undefined
    ) {
      return false;
    }

    // If both conditions are met, keep the experience in the filtered list
    return true;
  });

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
      order: 0,
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
      order: finishUpData?.theOrder?.summary || 1,
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
      order: finishUpData?.theOrder?.experiences || 2,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredExperiences !== null,
    },
    {
      id: 'educations',
      component: (
        <EducationsSection templateType={templateSelected} educations={filteredEducations} />
      ),
      order: finishUpData?.theOrder?.educations || 3,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredEducations !== null,
    },
    {
      id: 'involvements',
      component: (
        <InvolvementSection templateType={templateSelected} involvements={filteredInvolvements} />
      ),
      order: finishUpData?.theOrder?.involvements || 4,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredInvolvements !== null,
    },
    {
      id: 'projects',
      component: <ProjectSection templateType={templateSelected} projects={filteredProjects} />,
      order: finishUpData?.theOrder?.projects || 5,
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
      order: finishUpData?.theOrder?.certifications || 6,
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
      order: finishUpData?.theOrder?.skills || 7,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredSkills !== null,
    },
  ];
  const customSections = finishUpData?.customSections || [];

  //Iterate over custom sections and add them to the sections array
  customSections.forEach((customSection, index) => {
    const filteredCustomSection = customSection?.sectionData?.filter(section => {
      // Check if section is displayable (isDisplay is true)
      if (section.isDisplay !== true) {
        return false;
      }

      // Check if title is not null, undefined, or an empty string
      if (section.title === null || section.title === undefined || section.title === '') {
        return false;
      }

      // If both conditions are met, keep the section in the filtered list
      return true;
    });
    // customSections.forEach((customSection, index) => {
    //   const customSectionObject = customSection;
    // });
    const customSectionTitle = customSection?.sectionName;
    sections.push({
      id: `customSection${index + 1}`,
      component: (
        <CustomSections
          highlightAts={highlightAts}
          templateType={templateSelected}
          customSectionTitle={customSectionTitle}
          experiences={filteredCustomSection}
          onChangeOrder={sortedExperiences => {
            for (let i = 0; i < sortedExperiences.length; i++) {
              sortedExperiences[i].theOrder = i + 1;
            }
            console.log('sortedCustoms: ', sortedExperiences);
            let newFinishUpData = { ...finishUpData };
            // newFinishUpData.experiences = sortedExperiences;
            // setFinishUpData(newFinishUpData);
          }}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
        />
      ),
      order: customSection?.theOrder || 99,
      canBeDrag: true,
      canBeDisplayed: true,
    });
  });

  sections.sort((a, b) => a.order - b.order);

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
