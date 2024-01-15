/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Alert,
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Divider,
  Empty,
  Input,
  Modal,
  Result,
  Space,
  notification,
} from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponents/InformationSection';
// import SummarySection from '@/app/components/Templates/SectionComponentsV2/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponents/ExperiencesSection';
// import EducationsSection from '@/app/components/Templates/SectionComponentsV2/EducationsSection';
// import SkillsSection from '@/app/components/Templates/SectionComponentsV2/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import {
  getAudit,
  getFinishUp,
  getReviewResponse,
  newResume,
  overwriteResume,
  syncUp,
  updateReviewResponse,
  updateReviewResponsePublic,
} from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';
import CVLayoutReviewerView from '@/app/components/Templates/CVLayoutReviewerView';
import { Box, VStack } from '@chakra-ui/react';
import { CommentOutlined, ExclamationCircleFilled, StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
// import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';

import ProjectSection from '@/app/components/Templates/SectionComponents/ProjectSection';
import CertificationSection from '@/app/components/Templates/SectionComponents/CertificationSection';
import InvolvementSection from '@/app/components/Templates/SectionComponents/InvolvementsSection';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import UserHeaderReview from '@/app/components/UserHeaderReview';
import RatingForm from '@/app/components/Form/RatingForm';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
import CustomSections from '@/app/components/Templates/SectionComponents/CustomSection';
import CreateResumeReviewConCac from '@/app/components/Modal/CreateResumeReviewConCac';
// import { getRequestList } from '../../reviewServices';
const { confirm } = Modal;

export default function FinishUp({ params }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message) => {
    api.info({
      message: 'Notification',
      description: message,
      placement,
    });
  };
  const [isLoading, setIsLoading] = useState(true);

  const [finishUpData, setFinishUpData] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [templateData, setTemplateData] = useState(null);
  const [showFinishupCV, setShowFinishupCV] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState({
    'MY REVIEWS': true,
  });
  const { avatar, email, userRole } = useStore();

  const [templateSelected, setTemplateSelected] = useState('classical');
  const [toolbarState, setToolbarState] = useState({
    fontSize: '9pt',
    lineHeight: 1.4,
    fontFamily: 'Merriweather',
    fontWeight: 'normal',
    zoom: '130%',
    paperSize: 'letter',
    hasDivider: true,
    hasIndent: false,
    fontColor: 'rgb(0, 0, 0)',
  });
  const [highlightAts, setHighlightAts] = useState([]);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
  }, [toolbarState]);

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
    customSections1: 99,
    customSections2: 99,
    customSections3: 99,
  };

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
    console.log('handleSectionsOrderChange: ', newOrder);

    const updatedOrder = { ...theOrder }; // Copy the existing order
    newOrder.forEach((item, index) => {
      if (item && item.type) {
        const componentName = item.type.name;
        const stateKey = componentToStateKey[componentName];
        if (componentName === 'CustomSections') {
          console.log('handleSectionsOrderChangeitemCustomSections: ', item?.props?.index);
          if (item?.props?.index === 1) {
            updatedOrder.customSections1 = index;
          } else if (item?.props?.index === 2) {
            updatedOrder.customSections2 = index;
          } else if (item?.props?.index === 3) {
            updatedOrder.customSections3 = index;
          }
          console.log('updatedOrder: ', updatedOrder);
        }
        if (stateKey !== undefined) {
          updatedOrder[stateKey] = index;
        }
      }
    });

    setTheOrder(updatedOrder);
    console.log('updatedOrder: ', updatedOrder);

    setSectionsOrder(updatedOrder);

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
    // Configuration object mapping type values to detailed properties
    console.log('handleDescriptionChange', newData, type, typeId);
    const config = {
      experience: { type: 'experiences', des: 'description' },
      education: { type: 'educations', des: 'description' },
      project: { type: 'projects', des: 'description' },
      involvement: { type: 'involvements', des: 'description' },
      certification: { type: 'certifications', des: 'certificateRelevance' },
      skill: { type: 'skills', des: 'description' },
      // Add more types as needed
    };

    // Check if the type is defined in the configuration
    if (config[type]) {
      console.log(
        `handleOrgNameChange newData ${type} ${config[type].type}`,
        newData,
        type,
        typeId,
      );

      const updatedItems = finishUpData[config[type].type].map(item => {
        if (item.id === typeId) {
          return {
            ...item,
            [config[type].des]: newData,
          };
        } else {
          return item;
        }
      });

      // Use a more descriptive variable name for clarity
      let newFinishUpData = { ...finishUpData };
      newFinishUpData[config[type].type] = updatedItems;

      setFinishUpData(newFinishUpData);
      console.log(
        `New finishup data after updated${type.charAt(0).toUpperCase() + type.slice(1)}:`,
        newFinishUpData,
      );
    } else if (type.startsWith('customSection')) {
      const sectionIndex = parseInt(type.replace('customSection', ''), 10) - 1;
      if (!isNaN(sectionIndex) && finishUpData?.customSections[sectionIndex]?.sectionData) {
        const updatedCustomSections = finishUpData.customSections[sectionIndex].sectionData.map(
          item => {
            if (item.id === typeId) {
              return {
                ...item,
                description: newData,
              };
            } else {
              return item;
            }
          },
        );
        console.log('updatedCustomSections', updatedCustomSections);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.customSections[sectionIndex].sectionData = updatedCustomSections;
        setFinishUpData(newFinishUpData);
      } else {
        console.error(`Invalid custom section index: ${sectionIndex}`);
      }
    } else {
      // Handle other cases or provide an error message
      console.error(`Unsupported type: ${type}`);
    }
  };

  const handleSummaryChange = newData => {
    console.log('handleSummaryChangenewData: ', newData);
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
          handleDescriptionChange={handleSummaryChange}
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
            console.log('sortedExperiences', sortedExperiences);
            for (let i = 0; i < sortedExperiences.length; i++) {
              sortedExperiences[i].theOrder = i + 1;
            }

            console.log('Finishup data:', finishUpData);
            let newFinishUpData = { ...finishUpData };
            newFinishUpData.experiences = sortedExperiences;

            setFinishUpData(newFinishUpData);
            console.log('New finishup data:', newFinishUpData);
          }}
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
        />
      ),
      order: finishUpData?.theOrder?.experiences || 2,
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: filteredExperiences !== null,
    },
    {
      id: 'educations',
      component: (
        <EducationsSection
          highlightAts={highlightAts}
          templateType={templateSelected}
          educations={filteredEducations}
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
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
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
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
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
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
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
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
          isEnableAts={false}
          isEditable={true}
          handleRoleChange={handleRoleChange}
          handleOrgNameChange={handleOrgNameChange}
          handleDescriptionChange={handleDescriptionChange}
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
          index={index + 1}
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
          type={`customSection${index + 1}`}
        />
      ),
      //customSection?.theOrder?.customSections1  if index is 0 then customSections1, if index is 1 then customSections2
      //do it how you want
      // order: customSection?.theOrder?.customSections1 || 99,
      order:
        index === 0
          ? customSection?.theOrder?.customSections1 || 95
          : index === 1
          ? customSection?.theOrder?.customSections2 || 96
          : index === 2
          ? customSection?.theOrder?.customSections3 || 97
          : index === 3
          ? customSection?.theOrder?.customSections4 || 98
          : 99,
      // order: customSection?.theOrder?.customSections1  || 99,
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

  const [overall, setOverall] = useState(fetchedData?.overall ? fetchedData.overall : '');
  const request = fetchedData?.request ? fetchedData.request : null;

  const handleChangeOverall = event => {
    setOverall(event.target.value);
  };

  // const [dataRequest, setDataRequest] = useState();

  // const fetchRequest = async () => {
  //   try {
  //     console.log('fetchData getReviewRequestsByCandiate');
  //     const fetchedDataFromAPI = await getRequestList();
  //     const targetId = params.id; // Assuming params.id is the target ID
  //     const requestedReview = fetchedDataFromAPI.find(request => request.id == targetId) || null;
  //     console.log('requestedReview', requestedReview);
  //     setDataRequest(requestedReview);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   fetchRequest();
  // }, []);
  const [message, setMessage] = useState();
  const fetchData = async () => {
    try {
      setShowFinishupCV(false);

      const requestId = params.id;
      const fetchedDataFromAPI = await getReviewResponse(requestId);
      setFetchedData(fetchedDataFromAPI);
      setOverall(fetchedDataFromAPI.overall);
      const data = fetchedDataFromAPI.feedbackDetail;
      // const data = await getFinishUp(1)
      // const fetchedData = await getReviewResponse(expertId, requestId);

      console.log('FinishUp data: ', data);

      if (data === null) {
        setFinishUpData(null);
        return;
      }
      const cvId = data.cvId;
      setFinishUpData(data);

      setShowFinishupCV(true);

      setTemplateSelected(data.templateType);
      setToolbarState(data.cvStyle);

      setSummary(data.summary);

      const data1 = await getAudit(cvId);
      setAuditData(data1);
    } catch (error) {
      if (error.response.data.error) {
        setMessage(error.response.data.error);
      } else if (error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('Something went wrong!!!');
      }

      console.error('Error fetching FinishUp data:', error);
    }
  };

  useEffect(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    console.log('selectedText: ', selectedText);

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const sendObj = {
        overall: overall,
        cv: finishUpData,
      };
      console.log('Save: ', sendObj);

      await updateReviewResponsePublic(fetchedData.id, sendObj); // Call the syncUp <function styleName=""></function>
      console.log('Save completed.');

      openNotification('bottomRight', `Save changed`);
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };
  const handleSaveDraft = async () => {
    try {
      const sendObj = {
        overall: overall,
        cv: finishUpData,
      };
      console.log('Save: ', sendObj);

      await updateReviewResponse(fetchedData.id, sendObj); // Call the syncUp <function styleName=""></function>
      console.log('Save completed.');
      openNotification('bottomRight', `Save changed`);
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

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const onCreated = () => {
    fetchData();
  };

  const [isDnd, setIsDnd] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  // Function to remove HTML tags from a string
  function removeHtmlTags(inputString) {
    return inputString.replace(/<\/?[^>]+(>|$)/g, '');
  }
  const onCreatedResume = async result => {
    console.log('onCreatedResume', result?.id);

    const newFinishUpData = { ...finishUpData };
    // Clean up HTML tags from the "description" field for each experience
    // Fields to process based on configuration

    const fieldsToProcess = [
      'experiences',
      'certifications',
      'projects',
      'skills',
      'educations',
      'summary',
      'involvements',
      'customSections',
    ];
    // Iterate over the specified fields in the configuration
    fieldsToProcess.forEach(field => {
      if (Array.isArray(newFinishUpData[field])) {
        // For arrays, iterate over each object in the array
        newFinishUpData[field].forEach(item => {
          // Check if the specified fields exist and are strings
          if (item && typeof item.description === 'string') {
            // Remove HTML tags for the specified field
            item.description = removeHtmlTags(item.description);
          }
          // If there is an additional field 'revaluteDes', and it is a string
          if (item && typeof item.certificateRelevance === 'string') {
            // Remove HTML tags for the 'revaluteDes' field
            item.revaluteDes = removeHtmlTags(item.revaluteDes);
          }

          // If there is a 'description' field in customSections, and it is a string
          if (item && item.sectionData && Array.isArray(item.sectionData)) {
            item.sectionData.forEach(section => {
              if (section && typeof section.description === 'string') {
                // Remove HTML tags for the 'description' field in customSections
                section.description = removeHtmlTags(section.description);
              }
            });
          }
        });
      } else if (typeof newFinishUpData[field] === 'string') {
        // For single strings, remove HTML tags directly
        newFinishUpData[field] = removeHtmlTags(newFinishUpData[field]);
      }
    });

    // Now, the specified fields in the newFinishUpData object do not contain HTML tags
    console.log('newFinishUpData: ', newFinishUpData);
    try {
      await newResume(result?.id, newFinishUpData);
      notification.success({
        message: 'Finish create new resume success',
      });
    } catch (error) {
      notification.error({
        message: `Finish create new resume. Error: ${error?.response?.data}`,
      });
      console.log('error: ', error);
    }
  };

  const onConfirm = async () => {
    console.log('onConfirm');
    await confirmFinishOveride();
  };
  const confirmFinishOveride = async () => {
    try {
      console.log('confirmFinish: ', fetchedData?.cvId);
      // console.log('confirmFinishNew: ', finishUpData);
      //Delete all comment tag from finishUpData
      const newFinishUpData = { ...finishUpData };
      // Clean up HTML tags from the "description" field for each experience
      // Fields to process based on configuration

      const fieldsToProcess = [
        'experiences',
        'certifications',
        'projects',
        'skills',
        'educations',
        'summary',
        'involvements',
        'customSections',
      ];
      // Iterate over the specified fields in the configuration
      fieldsToProcess.forEach(field => {
        if (Array.isArray(newFinishUpData[field])) {
          // For arrays, iterate over each object in the array
          newFinishUpData[field].forEach(item => {
            // Check if the specified fields exist and are strings
            if (item && typeof item.description === 'string') {
              // Remove HTML tags for the specified field
              item.description = removeHtmlTags(item.description);
            }
            // If there is an additional field 'revaluteDes', and it is a string
            if (item && typeof item.certificateRelevance === 'string') {
              // Remove HTML tags for the 'revaluteDes' field
              item.revaluteDes = removeHtmlTags(item.revaluteDes);
            }

            // If there is a 'description' field in customSections, and it is a string
            if (item && item.sectionData && Array.isArray(item.sectionData)) {
              item.sectionData.forEach(section => {
                if (section && typeof section.description === 'string') {
                  // Remove HTML tags for the 'description' field in customSections
                  section.description = removeHtmlTags(section.description);
                }
              });
            }
          });
        } else if (typeof newFinishUpData[field] === 'string') {
          // For single strings, remove HTML tags directly
          newFinishUpData[field] = removeHtmlTags(newFinishUpData[field]);
        }
      });

      // Now, the specified fields in the newFinishUpData object do not contain HTML tags
      console.log('newFinishUpData: ', newFinishUpData);
      const result = await overwriteResume(fetchedData?.cvId, newFinishUpData);
      notification.success({
        message: 'Finish overwrite success',
      });
    } catch (error) {
      notification.error({
        message: `Finish overwrite. Error: ${error?.response?.data}`,
      });
      console.log('error: ', error);
    }
  };

  const showPromiseConfirmOveride = () => {
    confirm({
      title: 'Do you want to overwrite this resume to your old resume?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this will overwrite this to your resume.',
      async onOk() {
        await confirmFinishOveride();
      },
      onCancel() {},
    });
  };

  const confirmFinishNew = async () => {
    try {
      setIsOpen(true);
    } catch (error) {
      notification.error({
        message: `Finish create new resume. Error: ${error?.response?.data}`,
      });
      console.log('error: ', error);
    }
  };
  const showPromiseConfirmNew = () => {
    confirm({
      title: 'Do you want to create a new or overwrite to old resume with this data?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this will process with this data.',
      async onOk() {
        await confirmFinishNew();
      },
      onCancel() {},
    });
  };

  return (
    <main>
      <ConfigProvider>
        <UserLayout
          isCollapsed={false}
          avatar={avatar}
          email={email}
          userRole={userRole}
          userHeader={<UserHeaderReview initialEnabledCategories={enabledCategories} />}
          content={
            <div className="flex mt-8">
              {contextHolder}
              {message && (
                <Result
                  status="404"
                  title="404"
                  subTitle={message}
                  extra={
                    <Link href="/review/list/user">
                      <Button type="primary" className="bg-blue-500">
                        Back List Review
                      </Button>
                    </Link>
                  }
                />
              )}
              {finishUpData && showFinishupCV ? (
                <></>
              ) : (
                // <Result
                //   status="404"
                //   title="404"
                //   subTitle="Sorry, the page you visited does not exist."
                //   extra={
                //     <Link href="/">
                //       <Button type="primary">Back Home</Button>
                //     </Link>
                //   }
                // />
                <></>
              )}
              {showFinishupCV && (
                <div className="mr-2 flex flex-col">
                  {finishUpData ? (
                    <>
                      <Link href={'/review/list/user'} passHref>
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

                      <Card>
                        <div className="flex justify-start">
                          <div style={{ textAlign: 'left' }}>
                            {/* <textarea
                              className="inputEl"
                              value={overall}
                              disabled
                              onChange={e => handleChangeOverall(e)}
                            >
                              Comment for Cv
                            </textarea> */}
                            <div>Status: {request?.status}</div>
                            <div>Price: {request?.price}</div>
                          </div>
                        </div>
                      </Card>
                      {request?.status === 'Done' ? (
                        <div>
                          <div className="flex">
                            <CreateResumeReviewConCac
                              isOpen={isOpen}
                              cvId={fetchedData?.cvId}
                              setIsOpen={setIsOpen}
                              onCreated={onCreatedResume}
                              onConfirm={onConfirm}
                            />
                            <Alert
                              className="mt-4 mb-4"
                              message="This is your resume after review"
                              description="You can edit in this and apply to your old resume or save this to a new resume"
                              type="info"
                              action={
                                <Space direction="vertical ml-2">
                                  {/* <Button
                                    size="small"
                                    type="primary"
                                    onClick={showPromiseConfirmOveride}
                                  >
                                    Overwrite this to your old resume
                                  </Button> */}
                                </Space>
                              }
                              closable
                            />
                          </div>
                          <CVLayout
                            isShowBreak={true}
                            key={[templateSelected, toolbarState]}
                            templateType={templateSelected}
                            layoutStyles={toolbarState}
                            sectionsOrder={sectionsOrder}
                            onSectionsOrderChange={handleSectionsOrderChange}
                          >
                            {filteredSections.map(
                              section => section.canBeDisplayed && section.component,
                            )}
                          </CVLayout>
                          {
                            <div>
                              {' '}
                              <Button className='mt-10 mb-10' type="primary" onClick={showPromiseConfirmNew}>
                                SAVE
                              </Button>
                            </div>
                          }
                        </div>
                      ) : (
                        <div style={{ pointerEvents: 'none' }}>
                          <CVLayoutReviewerView
                            isShowBreak={false}
                            key={[templateSelected, toolbarState]}
                            layoutStyles={toolbarState}
                            sectionsOrder={sectionsOrder}
                            isDnd={false}
                            onSectionsOrderChange={handleSectionsOrderChange}
                          >
                            {filteredSections.map(
                              section => section.canBeDisplayed && section.component,
                            )}
                          </CVLayoutReviewerView>
                        </div>
                      )}
                      <div className="mb-16">
                        {request?.status === 'Done' && (
                          <textarea
                            className="inputEl"
                            value={overall}
                            disabled={true}
                            placeholder="Overall comment"
                          />
                        )}
                      </div>
                      <div className="mb-16">
                        {request?.status === 'Done' && fetchedData?.score === null && (
                          <RatingForm responseId={fetchedData?.id} onCreated={onCreated} />
                        )}
                      </div>
                      <div>
                        {fetchedData?.request?.status === 'Done' && (
                          <div style={{ marginBottom: '10px' }}>
                            {fetchedData?.score && (
                              <div className="pt-4 ">
                                <div className="flex">
                                  <div className=" flex">
                                    <p style={{ fontWeight: 'bold', marginRight: '2px' }}>
                                      {fetchedData?.score}
                                    </p>{' '}
                                    <StarFilled style={{ color: '#FFC107' }} />
                                  </div>
                                  <div className="ml-4 text-gray-500">
                                    {fetchedData?.dateComment}
                                  </div>
                                </div>

                                <div className="mt-3">
                                  {fetchedData?.request ? (
                                    <span
                                      dangerouslySetInnerHTML={{ __html: fetchedData?.comment }}
                                    />
                                  ) : (
                                    <Empty />
                                  )}

                                  <div className="flex mt-4">
                                    <Avatar
                                      shape="square"
                                      size="large"
                                      src={fetchedData?.user?.avatar}
                                    />
                                    <div className="ml-4">
                                      <div>{fetchedData?.user?.name}</div>
                                      <div>
                                        {/* <p style={{ color: '#4D70EB' }}> job title - Developer ne</p> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {/* {fetchedData?.score && (
                          <Card className="mt-8 mb-16">
                            <div className="mt-4" style={{ textAlign: 'left' }}>
                              <div className="flex">
                                <div className="ml-4 flex">
                                  <p style={{ fontWeight: 'bold', marginRight: '2px' }}>
                                    {fetchedData?.score}
                                  </p>{' '}
                                  <StarFilled style={{ color: '#FFC107' }} />
                                </div>
                                <div className="ml-4 text-gray-500"></div>
                              </div>
                              <div>
                                {fetchedData?.comment ? (
                                  <span
                                    dangerouslySetInnerHTML={{ __html: fetchedData?.comment }}
                                  />
                                ) : (
                                  <Empty />
                                )}
                              </div>
                            </div>
                          </Card>
                        )} */}
                      </div>
                      <div>
                        {/* <textarea
                          className="inputEl"
                          value={overall}
                          disabled
                          onChange={e => handleChangeOverall(e)}
                        >
                          Comment for Cv
                        </textarea> */}

                        {/* <button
                          style={{
                            height: '30px',
                            marginTop: '10px',
                            marginLeft: '10px',
                            marginBottom: '10px',
                          }}
                          className="button"
                          type=""
                          onClick={() => handleSaveDraft()}
                        >
                          Save draft
                        </button>

                        <button
                          style={{
                            height: '30px',
                            marginTop: '10px',
                            marginLeft: '10px',
                            marginBottom: '10px',
                          }}
                          className="button"
                          type=""
                          onClick={() => handleSave()}
                        >
                          Submit
                        </button> */}
                      </div>
                    </>
                  ) : (
                    <></>
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
