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
import { TRUE } from 'sass';

export default function FinishUpV2({ cvId }) {
  const [finishUpData, setFinishUpData] = useState(null);
  const [auditData, setAuditData] = useState(null);

  const [templateData, setTemplateData] = useState(null);
  const [showFinishupCV, setShowFinishupCV] = useState(false);

  const { avatar, email, userRole, ats, setAts } = useStore();
  const enabledCategories = { 'FINISH UP': true };

  const [templateSelected, setTemplateSelected] = useState('classical');
  const [toolbarState, setToolbarState] = useState({
    fontSize: '9pt',
    lineHeight: 1.4,
    fontFamily: 'Merriweather',
    fontWeight: 'normal',
    zoom: '100%',
    paperSize: 'letter',
    hasDivider: true,
    hasIndent: false,
    fontColor: 'rgb(0, 0, 0)',
  });
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

  // 'filteredSections' now contains only sections where 'educations' is not null, undefined, and has a length greater than 0, and 'projects' has a length greater than 0
  console.log('filteredSections: ', filteredSections);
  const fetchData = async () => {
    try {
      const data = await getFinishUp(cvId);
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
      const data1 = await getAudit(cvId);
      setAuditData(data1);
    } catch (error) {
      console.error('Error fetching getAudit data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchAudit();
  }, []);

  const handleSave = async () => {
    try {
      const cvId123 = cvId;

      setShowFinishupCV(false);
      finishUpData.templateType = templateSelected;
      await saveCv(cvId123, finishUpData); // Call the syncUp function
      console.log('Save completed.');

      fetchData();
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };
  const handleSubmitCustomSections = async customSections => {
    console.log('handleSubmitCustomSections', customSections);
    try {
      const cvId123 = cvId;
      setShowFinishupCV(false);
      console.log('handleSubmitCustomSectionsfinishUpData', finishUpData);
      finishUpData.customSections = customSections.customSections;
      console.log('handleSubmitCustomSectionsfinishUpDatacustomSections', finishUpData);

      await saveCv(cvId123, finishUpData);
      console.log('Save completed.');

      fetchData();
    } catch (error) {
      console.error('Error during synchronization:', error);
    }
  };

  const handleSyncUp = async () => {
    try {
      const cvId123 = cvId;
      setShowFinishupCV(false);

      await syncUp(cvId123); // Call the syncUp function
      console.log('Synchronization completed.');

      fetchData();
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };

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
    const result = await getVersionsList(cvId);
    setVersions(result);
    console.log('version::result: ', result);
  };
  const handleHideVersion = () => {
    setIsShowVersion(false);
    setVersions(null);
    setSelectedVersion(null);
    fetchData();
    fetchAudit();
  };
  const handleRestoreVersion = async () => {
    try {
      const result = await restoreVersion(cvId, selectedVersion);
      console.log('handleRestoreVersion::result: ', result);
      notification.success({
        message: 'Restore version successfully',
      });
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
      setTemplateSelected(result?.cvBody?.templateType);
      setToolbarState(result?.cvBody?.cvStyle);
      setSummary(result?.cvBody?.summary);
      setTheOrder(result?.cvBody?.theOrder);
      setShowFinishupCV(true);
      console.log('handleChooseVersion ', result);
    } catch (error) {
      console.log('handleChooseVersion::error: ', error);
    }
  };

  const handleGen = () => {
    console.log('handleGen: ');
  };

  const [matchedJobs, setMatchedJobs] = useState([]);
  const handleLinkClick = (e, link) => {
    // Handle the link click to open the link
    e.stopPropagation(); // Prevents the click from reaching the outer div
    window.open(link, '_blank');
  };

  return (
    <main>
      <div className="flex">
        {showFinishupCV && (
          <div className="mr-2 flex flex-col">
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
      </div>
    </main>
  );
}
