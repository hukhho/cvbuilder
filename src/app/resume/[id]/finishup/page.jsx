/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Divider, Modal, notification } from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponents/InformationSection';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponents/ExperiencesSection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import {
  getAudit,
  getFinishUp,
  getVersion,
  getVersionsList,
  restoreVersion,
  saveCv,
  syncUp,
} from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import './version.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';
import Ats from './Ats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faTimes } from '@fortawesome/free-solid-svg-icons';
import AiFeedback from './AiFeedback';
import Involvement from '../involvement/page';
import InvolvementSection from '@/app/components/Templates/SectionComponents/InvolvementsSection';
import ProjectSection from '@/app/components/Templates/SectionComponents/ProjectSection';
import Certification from '../certification/page';
import CertificationSection from '@/app/components/Templates/SectionComponents/CertificationSection';
import Link from 'next/link';
import ExpertReviewCard from './ExpertReviewCard';
import VideoCard from './VideoCard';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
import UserLayoutNoAuth from '@/app/components/Layout/UserLayoutNoAuth';
import CustomSections from '@/app/components/Templates/SectionComponents/CustomSection';
import Custom from './Custom';
import { ExportOutlined } from '@ant-design/icons';

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

  const { avatar, email, userRole, ats, setAts } = useStore();
  const enabledCategories = { 'FINISH UP': true };

  // useEffect(() => {
  //   setShowFinishupCV(false);
  // }, []);

  const [templateSelected, setTemplateSelected] = useState(mockData.data.resume.templateType);
  const [toolbarState, setToolbarState] = useState(mockData.data.resume.resumeStyle);
  const [highlightAts, setHighlightAts] = useState([]);

  const [dataAts, setDataAts] = useState();
  const [isCreatedAts, setIsCreatedAts] = useState(false);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
    let newFinishUpData = { ...finishUpData };
    newFinishUpData.cvStyle = toolbarState;
    setFinishUpData(newFinishUpData);
  }, [toolbarState]);

  useEffect(() => {
    console.log('ats:', ats);
  }, [ats]);
  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};
  experiences?.sort((a, b) => a.theOrder - b.theOrder);
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
    console.log('handleSkillsOrderChange: ', newOrder);
    setSkillsOrder(newOrder);
  }, []);

  // to store order of template

  const [sectionsOrder, setSectionsOrder] = useState([]);

  // const theOrders = {
  //   summary: 2,
  //   experiences: 1,
  //   educations: 3,
  //   involvements: 4,
  //   projects: 5,
  //   certifications: 6,
  //   skills: 7,
  // };

  const componentToStateKey = {
    SummarySection: 'summary',
    ExperiencesSection: 'experiences',
    EducationsSection: 'educations',
    InvolvementSection: 'involvements',
    ProjectSection: 'projects',
    CertificationSection: 'certifications',
    SkillsSection: 'skills',
  };

  const handleSectionsOrderChange = newOrder => {
    const updatedOrder = { ...theOrder }; // Copy the existing order

    newOrder.forEach((item, index) => {
      if (item && item.type) {
        const componentName = item.type.name;
        const stateKey = componentToStateKey[componentName];

        if (stateKey !== undefined) {
          updatedOrder[stateKey] = index;
        }
      }
    });

    setTheOrder(updatedOrder);
    console.log('updatedOrder: ', updatedOrder);
    setSectionsOrder(newOrder);

    let newFinishUpData = { ...finishUpData };
    newFinishUpData.theOrder = updatedOrder;

    setFinishUpData(newFinishUpData);
    console.log('New finishup data after:', newFinishUpData);
  };

  const handleToolbarChange = values => {
    setToolbarState(values);
  };

  const handleSetHighlight = values => {
    console.log('handleSetHighlight values: ', values);
    setHighlightAts(values);
  };
  const handleUnSetHighlight = values => {
    console.log('handleSetHighlight values: ', values);
    setHighlightAts([]);
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

  // Accessing data from the `theOrders` object
  const summaryOrderSection = theOrders.summary; // Retrieves the order for "summary"
  const experiencesOrderSection = theOrders.experiences; // Retrieves the order for "experiences"
  const skillsOrderSection = theOrders.skills; // Retrieves the order for "skills"
  const educationsOrderSection = theOrders.educations; // Retrieves the order for "summary"
  const involvementsOrderSection = theOrders.involvements; // Retrieves the order for "experiences"
  const projectsOrderSection = theOrders.projects; // Retrieves the order for "skills"
  const certificationOrderSection = theOrders.involvements; // Retrieves the order for "skills"

  console.log('Summary Order:', summaryOrderSection);
  console.log('Experiences Order:', experiencesOrderSection);
  console.log('Skills Order:', skillsOrderSection);

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
          highlightAts={highlightAts}
          summary={summary}
        />
      ),
      order: finishUpData?.theOrder?.summary || 1,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: true,
    },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          experiences={experiences}
          onChangeOrder={sortedExperiences => {
            //Sort by theOrder but keep the original order if isDisplay is false
            //I mean if item 1 order 1, item 2 order 2, item3 order 3, item 4 order 4
            //item 1 isDisplay = true, item 2 isDisplay = false, item 3 isDisplay = true, item 4 isDisplay = true

            //after sort item 1 item 4 item 3, the order item 1 will 1 item 4 will 3, item 3 will 4
            //but item 2 will still 2

            //So I will sort by theOrder first, then sort by isDisplay
            // sortedExperiences.sort((a, b) => {
            //   if (a.isDisplay === false && b.isDisplay === false) {
            //     return 0;
            //   } else if (a.isDisplay === false) {
            //     return 1;
            //   }
            //   else if (b.isDisplay === false) {
            //     return -1;
            //   }
            //   else {
            //     return a.theOrder - b.theOrder;
            //   }
            // });

            console.log('sortedExperiences', sortedExperiences);
            for (let i = 0; i < sortedExperiences.length; i++) {
              sortedExperiences[i].theOrder = i + 1;
            }
            //set new theOrder to the sortedExperiences, lol,

            //after sort item 1 item 4 item 3, theOrder item 1 will 1 item 4 will 3, item 3 will 4
            //but item 2 will still 2

            // for (let i = 0; i < sortedExperiences.length; i++) {
            //   sortedExperiences[i].theOrder = sortedExperiences
            // }

            // sortedExperiences.sort((a, b) => {
            //   if (a.isDisplay === false && b.isDisplay === false) {
            //     return 0;
            //   } else if (a.isDisplay === false) {
            //     return 1;
            //   } else if (b.isDisplay === false) {
            //     return -1;
            //   } else {
            //     return a.theOrder - b.theOrder;
            //   }
            // });
            //set new theOrder to the sortedExperiences

            // for (let i = 0; i < sortedExperiences.length; i++) {
            //   sortedExperiences[i].theOrder = i + 1;
            // }
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
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredExperiences !== null,
    },
    // {
    //   id: 'customSections',
    //   component: (
    //     <CustomSections
    //       highlightAts={highlightAts}
    //       templateType={templateSelected}
    //       experiences={filteredExperiences}
    //       onChangeOrder={sortedExperiences => {
    //         for (let i = 0; i < sortedExperiences.length; i++) {
    //           sortedExperiences[i].theOrder = i + 1;
    //         }
    //         console.log('Finishup data:', finishUpData);
    //         let newFinishUpData = { ...finishUpData };
    //         newFinishUpData.experiences = sortedExperiences;

    //         setFinishUpData(newFinishUpData);
    //         console.log('New finishup data:', newFinishUpData);
    //       }}
    //       handleRoleChange={handleRoleChange}
    //       handleOrgNameChange={handleOrgNameChange}
    //       handleDescriptionChange={handleDescriptionChange}
    //     />
    //   ),
    //   order: finishUpData?.theOrder?.experiences || 2,
    //   canBeDrag: true, // Set to true if this section can be dragged
    //   canBeDisplayed: filteredExperiences !== null,
    // },
    {
      id: 'educations',
      component: (
        <EducationsSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          educations={filteredEducations}
        />
      ),
      order: finishUpData?.theOrder?.educations || 3,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredEducations !== null,
    },
    {
      id: 'involvements',
      component: (
        <InvolvementSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          involvements={filteredInvolvements}
        />
      ),
      order: finishUpData?.theOrder?.involvements || 4,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredInvolvements !== null,
    },
    {
      id: 'projects',
      component: (
        <ProjectSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          projects={filteredProjects}
        />
      ),
      order: finishUpData?.theOrder?.projects || 5,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredProjects != null,
    },
    {
      id: 'certifications',
      component: (
        <CertificationSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          certifications={filteredCertifications}
        />
      ),
      order: finishUpData?.theOrder?.certifications || 6,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredCertifications !== null,
    },
    {
      id: 'skills',
      component: (
        <SkillsSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          skills={filteredSkills}
          onChangeOrder={handleSkillsOrderChange}
          canBeDisplayed={filteredSkills !== null}
        />
      ),
      order: finishUpData?.theOrder?.skills || 7,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredSkills !== null,
    },
  ];

  //I want custom sections to be added to the sections array
  //I want to be able to add custom sections to the sections array

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

  // sections.push({
  //   id: `customSection`,
  //   component: (
  //     <CustomSections
  //       highlightAts={highlightAts}
  //       templateType={templateSelected}
  //       experiences={filteredExperiences}
  //       onChangeOrder={sortedExperiences => {
  //         for (let i = 0; i < sortedExperiences.length; i++) {
  //           sortedExperiences[i].theOrder = i + 1;
  //         }
  //         let newFinishUpData = { ...finishUpData };
  //         newFinishUpData.experiences = sortedExperiences;
  //         setFinishUpData(newFinishUpData);
  //       }}
  //       handleRoleChange={handleRoleChange}
  //       handleOrgNameChange={handleOrgNameChange}
  //       handleDescriptionChange={handleDescriptionChange}
  //     />
  //   ),
  //   order: 99,
  //   canBeDrag: true,
  //   canBeDisplayed: true,
  // });
  
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
        const data = await getFinishUp(params.id);
        console.log('FinishUp data: ', data);

        setTheOrder(data.theOrder);
        setFinishUpData(data);
        setTemplateSelected(data.templateType);
        setToolbarState(data.cvStyle);
        setSummary(data.summary);
        setShowFinishupCV(true);

        console.log('data.theOrder: ', data.theOrder);
      } catch (error) {
        console.error('Error fetching FinishUp data:', error);
      }
    };
    const fetchAudit = async () => {
      try {
        const data1 = await getAudit(params.id);
        setAuditData(data1);
      } catch (error) {
        console.error('Error fetching getAudit data:', error);
      }
    };
    fetchData();
    fetchAudit();
  }, []);

  const handleSave = async () => {
    try {
      const cvId123 = params.id;

      setShowFinishupCV(false);
      finishUpData.templateType = templateSelected;
      await saveCv(cvId123, finishUpData); // Call the syncUp function
      console.log('Save completed.');

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
  const handleSubmitCustomSections = async customSections => {
    console.log('handleSubmitCustomSections', customSections);
    try {
      const cvId123 = params.id;
      setShowFinishupCV(false);
      console.log('handleSubmitCustomSectionsfinishUpData', finishUpData);
      finishUpData.customSections = customSections.customSections;
      console.log('handleSubmitCustomSectionsfinishUpDatacustomSections', finishUpData);

      await saveCv(cvId123, finishUpData);
      console.log('Save completed.');
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
  const [selectedVersion, setSelectedVersion] = useState();
  const handleShowVersion = async () => {
    setIsShowVersion(true);
    const result = await getVersionsList(params.id);
    setVersions(result);
    console.log('version::result: ', result);
  };
  const handleHideVersion = () => {
    setIsShowVersion(false);

    setVersions(null);
    setSelectedVersion(null);

    const fetchData = async () => {
      try {
        setShowFinishupCV(false);

        const data = await getFinishUp(params.id);
        console.log('FinishUp data: ', data);

        setTheOrder(data.theOrder);
        setFinishUpData(data);
        setTemplateSelected(data.templateType);
        setToolbarState(data.cvStyle);
        setSummary(data.summary);
        setShowFinishupCV(true);

        console.log('data.theOrder: ', data.theOrder);
      } catch (error) {
        console.error('Error fetching FinishUp data:', error);
      } finally {
        setShowFinishupCV(true);
      }
    };
    const fetchAudit = async () => {
      try {
        const data1 = await getAudit(params.id);
        setAuditData(data1);
      } catch (error) {
        console.error('Error fetching getAudit data:', error);
      }
    };
    fetchData();
    fetchAudit();
  };
  const handleRestoreVersion = async () => {
    try {
      const result = await restoreVersion(params.id, selectedVersion);
      console.log('handleRestoreVersion::result: ', result);
      notification.success({
        message: 'Restore version successfully',
      });
      const fetchData = async () => {
        try {
          setShowFinishupCV(false);

          const data = await getFinishUp(params.id);
          console.log('FinishUp data: ', data);

          setTheOrder(data.theOrder);
          setFinishUpData(data);
          setTemplateSelected(data.templateType);
          setToolbarState(data.cvStyle);
          setSummary(data.summary);
          setShowFinishupCV(true);

          console.log('data.theOrder: ', data.theOrder);
        } catch (error) {
          console.error('Error fetching FinishUp data:', error);
        } finally {
          setShowFinishupCV(true);
        }
      };
      const fetchAudit = async () => {
        try {
          const data1 = await getAudit(params.id);
          setAuditData(data1);
        } catch (error) {
          console.error('Error fetching getAudit data:', error);
        }
      };
      fetchData();
      fetchAudit();
    } catch (error) {
      notification.error({
        message: 'Restore version failed',
      });
      
    }
    
  };
  const handleChooseVersion = async versionId => {
    console.log('versionId: ', versionId);
    setSelectedVersion(versionId);
    setShowFinishupCV(false);
    try {
      const result = await getVersion(versionId);
      
      setFinishUpData(result?.cvBody);
  
      setShowFinishupCV(true);
  
      setTemplateSelected(result?.cvBody?.templateType);
      setToolbarState(result?.cvBody?.cvStyle);
  
      setSummary(result?.cvBody?.summary);
      console.log('handleChooseVersion ', result);
    } catch (error) {
        console.log('handleChooseVersion::error: ', error);
    }

    
  };

  const handleGen = () => {
    console.log('handleGen: ');

    // setAts([
    //   {
    //     ats: 'Product Owner',
    //     status: 'Pass',
    //   },
    //   {
    //     ats: 'Product Manager',
    //     status: 'Pass',
    //   },
    //   {
    //     ats: 'Analyze',
    //     status: 'Pass',
    //   },
    // ]);
  };

  const [matchedJobs, setMatchedJobs] = useState([]);
  const handleLinkClick = (e, link) => {
    // Handle the link click to open the link
    e.stopPropagation(); // Prevents the click from reaching the outer div
    window.open(link, '_blank');
  };
  return (
    <main>
      <ConfigProvider>
        <UserLayoutNoAuth
          isCollapsed={true}
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={
            <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex">
              {showFinishupCV && (
                <div className="mr-2 flex flex-col">
                  <Modal
                    title=""
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    className="custom"
                    footer={[]}
                  >
                    <ScoreFinishUp data={auditData} cvId={params.id} />
                  </Modal>
                  <div
                    style={
                      {
                        // background: 'white',
                        // width: '100%',
                      }
                    }
                  >
                    <div style={{ width: '100%' }}>
                      <FinishupToolbar
                        handleChangeTemplateSelected={value => {
                          console.log('handleChangeTemplateSelected', value);
                          setTemplateSelected(value);
                        }}
                        handleOpenModal={() => setOpen(true)}
                        toolbarState={toolbarState}
                        auditData={auditData}
                        onToolbarChange={handleToolbarChange}
                        onClickSave={handleSave}
                        onClickDownload={handleDownloadButtonClick}
                        onClickSyncUp={handleSyncUp}
                        currentTemplate={templateSelected}
                      />
                    </div>
                  </div>
                  <CVLayout
                    isShowBreak={true}
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
              {showFinishupCV && (
                <div
                  className="flex flex-col items-start"
                  style={{ position: 'static', width: '360px' }}
                >
                  <VideoCard />
                  {/* <div>
                    {matchedJobs?.map((job, index) => {
                      return (<>{job?.}</>)
                    }
                  </div> */}
                  {/* <ExpertReviewCard /> */}
                  <AiFeedback cvId={params.id} />

                  <Ats
                    cvId={params.id}
                    dataAts={dataAts}
                    isCreatedAts={isCreatedAts}
                    setIsCreatedAts={setIsCreatedAts}
                    setDataAts={setDataAts}
                    onGen={handleSetHighlight}
                    onDisableHightlight={handleUnSetHighlight}
                  />

                  <Custom
                    cvId={params.id}
                    dataAts={dataAts}
                    isCreatedAts={isCreatedAts}
                    setIsCreatedAts={setIsCreatedAts}
                    setDataAts={setDataAts}
                    finishUpData={finishUpData}
                    onGen={handleSetHighlight}
                    onSubmitCustomSections={handleSubmitCustomSections}
                    onDisableHightlight={handleUnSetHighlight}
                  />
                </div>
              )}

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
                          <i className="fas fa-history mr-1" aria-hidden="true" /> Version History
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
                            {selectedVersion && (
                              <button className="button" onClick={handleRestoreVersion}>
                                Restore the old Content
                              </button>
                            )}
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
                                      <span
                                        className={`h-2.5 w-2.5 rounded-full ${
                                          version.id === selectedVersion ? 'bg-blue-500' : ''
                                        }`}
                                      />
                                    </span>
                                  </span>
                                  <span className="ml-4 flex min-w-0 flex-col">
                                    <span className="flex flex text-sm font-medium">
                                      <span>{version.timestamp}</span>
                                      <span className="ml-2 text-gray-500">
                                        {version?.jobPosting?.name}
                                      </span>
                                      {version?.jobPosting?.name && ( <a
                                        className="absolute"
                                        style={{ right: '8px' }}
                                        onClick={e => handleLinkClick(e, `/job/${version?.jobPosting?.id}`)}
                                      >
                                        <ExportOutlined />
                                      </a>)}                                
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
          }
        />
      </ConfigProvider>
    </main>
  );
}
