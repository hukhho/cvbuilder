/* eslint-disable */

'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
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
  notification,
} from 'antd';
import UserCVBuilderHeader from '@/app/components/UserCVBuilderHeader';
import UserCVBuilderLayout from '@/app/components/Layout/UseCVBuilderLayout';
import CVLayout from '@/app/components/Templates/CVLayout';
import InformationSection from '@/app/components/Templates/SectionComponentsV2/InformationSection';
import SummarySection from '@/app/components/Templates/SectionComponentsV2/SummarySection';
import ExperiencesSection from '@/app/components/Templates/SectionComponentsV2/ExperiencesSection';
// import EducationsSection from '@/app/components/Templates/SectionComponentsV2/EducationsSection';
// import SkillsSection from '@/app/components/Templates/SectionComponentsV2/SkillsSection';
import FinishupToolbar from '@/app/components/Toolbar/FinishupToolbar';
import {
  getAudit,
  getFinishUp,
  getReviewResponse,
  syncUp,
  updateReviewResponse,
  updateReviewResponsePublic,
} from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';
import { Box, VStack } from '@chakra-ui/react';
import { CommentOutlined, ExclamationCircleFilled, StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import EducationsSection from '@/app/components/Templates/SectionComponentsV2/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponentsV2/SkillsSection';
import ProjectSection from '@/app/components/Templates/SectionComponentsV2/ProjectSection';
import CertificationSection from '@/app/components/Templates/SectionComponentsV2/CertificationSection';
import InvolvementSection from '@/app/components/Templates/SectionComponentsV2/InvolvementsSection';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import { acceptRequest, getRequestList, rejectRequest } from '../../expertServices';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
import UserLayoutNoAuth from '@/app/components/Layout/UserLayoutNoAuth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
const { confirm } = Modal;

// import CVLayoutReviewerView from '@/app/components/Templates/CVLayoutReviewerView';
const CVLayoutReviewerView = dynamic(
  () => import('@/app/components/Templates/CVLayoutReviewerView'),
  {
    ssr: false,
  },
);

const DEFAULT_RESUME_STYLES = {
  fontSize: '9pt',
  lineHeight: 1.4,
  fontFamily: 'Merriweather',
  fontWeight: 'normal',
  zoom: '130%',
  paperSize: 'letter',
  hasDivider: true,
  hasIndent: false,
  fontColor: 'rgb(0, 0, 0)',
};

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
  const [errorMessage, setErrorMessage] = useState();

  const [finishUpData, setFinishUpData] = useState(null);

  const updateFinishUpData = useCallback(newFinishUpData => {
    setFinishUpData(newFinishUpData);
  }, []);

  const [auditData, setAuditData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [templateData, setTemplateData] = useState(null);
  const [showFinishupCV, setShowFinishupCV] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState({
    'REVIEW REQUESTS': true,
  });
  const { avatar, email, userRole } = useStore();

  const [templateSelected, setTemplateSelected] = useState('classical');
  const [toolbarState, setToolbarState] = useState(DEFAULT_RESUME_STYLES);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
  }, [toolbarState]);

  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};

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

  // to store order of some user's information
  const [experiencesOrder, setExperiencesOrder] = useState([]);
  const [educationsOrder, setEducationsOrder] = useState([]);
  const [skillsOrder, setSkillsOrder] = useState([]);
  const [summary, setSummary] = useState();

  const elementRef = useRef(null); // Reference to the HTML element to be converted
  const router = useRouter();

  const [tooltip, setTooltip] = useState(null);
  const [currentText, setCurrentText] = useState(null);
  const [textareaState, setTextareaState] = useState('');
  const [isLnPayPending, setIsLnPayPending] = useState(false);
  const [isShowComment, setIsShowComment] = useState(false);
  const [selectionState, setSelectionState] = useState();
  const [selectedTextState, setSelectedTextState] = useState();
  const [selectionRange, setSelectionRange] = useState(null);

  const [currentId, setCurrentId] = useState(null);
  const [currentDataType, setCurrentDataType] = useState(null);
  const [currentDataId, setCurrentDataId] = useState(null);

  function handleInputBlur(range) {
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  async function onSubmitComment() {
    await handleSubmitComment(selectionState, selectedTextState);
  }
  const fetchDataComment = async newFinishUpData => {
    try {
      await handleSaveDraftWithData(newFinishUpData);
      setShowFinishupCV(true);
      const requestId = params.id;
      const fetchedDataFromAPI = await getReviewResponse(requestId);
      setFetchedData(fetchedDataFromAPI);
      setOverall(fetchedDataFromAPI.overall);
      // if (fetchedDataFromAPI.feedbackDetail === null) {

      //   setErrorMessage('Some thing went wrong!');
      //   return
      // }
      const data = fetchedDataFromAPI.feedbackDetail;
      // const data = await getFinishUp(1)
      // const fetchedData = await getReviewResponse(expertId, requestId);
      console.log('FinishUp data: ', data);
      if (data === null) {
        setFinishUpData(null);
        return;
      }
      const temp = finishUpData;

      setShowFinishupCV(false);
      setFinishUpData(temp);

      await new Promise(resolve => setTimeout(resolve, 10));

      setFinishUpData(data);
      setShowFinishupCV(true);

      setTemplateSelected(data?.templateType);
      setToolbarState(data?.cvStyle);
      setSummary(data?.summary);
    } catch (error) {
      console.error('Error fetching FinishUp data:', error);
    }
  };

  async function handleSubmitComment(selection, selectedText) {
    const comment = document.createElement('comment');
    comment.textContent = selectedText;
    const commentId =
      'comment_type_' +
      currentDataType +
      '_id_' +
      currentDataId +
      '_desId_' +
      currentId +
      '_' +
      Date.now(); // Generate a unique comment ID
    comment.setAttribute('id', commentId);
    comment.setAttribute('class', 'select-none comment-marker');
    comment.setAttribute('content', inputValue);

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(comment);
    setInputValue('');
    setCurrentText(null);
    setTooltip(null);
    setIsShowComment(false);

    const descriptionAfter = document.getElementById(currentId);

    if (descriptionAfter) {
      const content = descriptionAfter.innerHTML;
      console.log(
        'currentDataType: ',
        currentDataType,
        'currentDataId: ',
        currentDataId,
        'content: ',
        content,
      );
      if (currentDataType === 'experience') {
        const updatedExperiences = experiences.map(experience => {
          if (experience.id === currentDataId) {
            return {
              ...experience,
              description: content,
            };
          } else {
            return experience;
          }
        });
        console.log('updatedExperiences experience', updatedExperiences);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.experiences = updatedExperiences;
        setFinishUpData(newFinishUpData);

        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'education') {
        const updatedEducations = educations.map(education => {
          if (education.id === currentDataId) {
            return {
              ...education,
              description: content,
            };
          } else {
            return education;
          }
        });
        console.log('updatedEducations education', updatedEducations);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.educations = updatedEducations;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'skill') {
        const updatedSkills = skills.map(skill => {
          if (skill.id === currentDataId) {
            return {
              ...skill,
              description: content,
            };
          } else {
            return skill;
          }
        });
        console.log('updatedSkills skill', updatedSkills);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.skills = updatedSkills;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'project') {
        const updatedProjects = projects.map(project => {
          if (project.id === currentDataId) {
            return {
              ...project,
              description: content,
            };
          } else {
            return project;
          }
        });
        console.log('updatedProjects project', updatedProjects);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.projects = updatedProjects;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'certification') {
        const updatedCertifications = certifications.map(certification => {
          if (certification.id === currentDataId) {
            return {
              ...certification,
              description: content,
            };
          } else {
            return certification;
          }
        });
        console.log('updatedCertifications certification', updatedCertifications);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.certifications = updatedCertifications;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'involvement') {
        const updatedInvolvements = involvements.map(involvement => {
          if (involvement.id === currentDataId) {
            return {
              ...involvement,
              description: content,
            };
          } else {
            return involvement;
          }
        });
        console.log('updatedInvolvements involvement', updatedInvolvements);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.involvements = updatedInvolvements;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      } else if (currentDataType === 'summary') {
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.summary = content;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      }
    } else {
      console.log('Element with id', currentId, 'not found');
    }
  }
  function onDeleteComment(commentId, type, randomId, dataId) {
    console.log('onDeleteComment:commentId:', commentId);
    console.log('onDeleteComment:type:', type);
    console.log('onDeleteComment:randomId:', randomId);
    console.log('onDeleteComment:dataId:', dataId);
    handleDeleteComment(commentId, type, randomId, dataId);
  }

  useEffect(() => {
    console.log('State updated, triggering re-render');
  }, [finishUpData, showFinishupCV]);

  // Function to handle comment deletion
  function handleDeleteComment(commentId, type, randomId, dataId) {
    console.log('handleDeleteComment:commentId:', commentId);
    const comment = document.getElementById(commentId);

    if (comment) {
      const content = comment.innerHTML; // Get the HTML content including child elements
      const commentContent = content.replace(/<span class="delete-button">x<\/span>/, '');

      const parent = comment.parentNode;

      // Create a new text node from the HTML content
      const contentNode = document.createTextNode(commentContent);

      // Insert the content node after the comment
      parent.insertBefore(contentNode, comment.nextSibling);

      // Remove the comment
      parent.removeChild(comment);
    }

    //Okey now description will be delete, now update experience description or education desription...
    const descriptionAfter = document.getElementById(randomId);

    if (descriptionAfter) {
      const content = descriptionAfter.innerHTML;
      //experiences, educations, projects, involvements, certifications, skills,
      if (type === 'experience') {
        const updatedExperiences = experiences.map(experience => {
          if (experience.id === dataId) {
            return {
              ...experience,
              description: content,
            };
          } else {
            return experience;
          }
        });
        console.log('updatedExperiences experience', updatedExperiences);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.experiences = updatedExperiences;
        fetchDataComment(newFinishUpData);
      } else if (type === 'education') {
        const updatedEducations = educations.map(education => {
          if (education.id === dataId) {
            return {
              ...education,
              description: content,
            };
          } else {
            return education;
          }
        });
        console.log('updatedEducations education', updatedEducations);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.educations = updatedEducations;
        fetchDataComment(newFinishUpData);
      } else if (type === 'skill') {
        const updatedSkills = skills.map(skill => {
          if (skill.id === dataId) {
            return {
              ...skill,
              description: content,
            };
          } else {
            return skill;
          }
        });
        console.log('updatedSkills skill', updatedSkills);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.skills = updatedSkills;
        fetchDataComment(newFinishUpData);
      } else if (type === 'project') {
        const updatedProjects = projects.map(project => {
          if (project.id === dataId) {
            return {
              ...project,
              description: content,
            };
          } else {
            return project;
          }
        });
        console.log('updatedProjects project', updatedProjects);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.projects = updatedProjects;
        fetchDataComment(newFinishUpData);
      } else if (type === 'certification') {
        const updatedCertifications = certifications.map(certification => {
          if (certification.id === dataId) {
            return {
              ...certification,
              description: content,
            };
          } else {
            return certification;
          }
        });
        console.log('updatedCertifications certification', updatedCertifications);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.certifications = updatedCertifications;
        fetchDataComment(newFinishUpData);
      } else if (type === 'involvement') {
        const updatedInvolvements = involvements.map(involvement => {
          if (involvement.id === dataId) {
            return {
              ...involvement,
              description: content,
            };
          } else {
            return involvement;
          }
        });
        console.log('updatedInvolvements involvement', updatedInvolvements);
        let newFinishUpData = { ...finishUpData };
        newFinishUpData.involvements = updatedInvolvements;
        fetchDataComment(newFinishUpData);
      } else if (type === 'summary') {
        console.log('NEW SUMMARY', content);
        // let newFinishUpData = { ...finishUpData };
        // newFinishUpData.involvements = updatedInvolvements;
        // fetchDataComment(newFinishUpData);

        let newFinishUpData = { ...finishUpData };
        newFinishUpData.summary = content;
        setFinishUpData(newFinishUpData);
        fetchDataComment(newFinishUpData);
      }
    } else {
      console.log('Element with id not found');
    }
  }

  function handleMouseUp(event, key, id, dataId) {
    if (key === null || key === undefined) {
      return;
    }
    if (
      fetchedData?.request?.status !== 'Processing' &&
      fetchedData?.request?.status !== 'Accept'
    ) {
      return;
    }

    setCurrentId(id);
    setCurrentDataType(key);
    setCurrentDataId(dataId);

    const selection = window.getSelection();
    setSelectionRange(selection.getRangeAt(0));

    setSelectionState(selection);
    const selectedText = selection.toString();
    setSelectedTextState(selectedText);
    console.log('selection: ', selection);
    console.log('FinishUp:handleMouseUp::key: ', key, 'id: ', id, 'dataId: ', dataId);
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const x = rect.left + window.scrollX + rect.width / 2;
      const y = rect.top + window.scrollY;

      setCurrentText(selectedText);
      setTooltip({ x, y, text: selection.toString(), key });
      setIsShowComment(true);
      console.log('currentText: ', currentText);
    }
    console.log('selectedText: ', selectedText);
  }

  function closeComment() {
    setCurrentText(null);
    setTooltip(null);
    setIsShowComment(false);
  }

  useEffect(() => {
    if (isLnPayPending) {
      return;
    }

    document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      // document.removeEventListener('mousedown');
    };
  }, [tooltip, isLnPayPending]);

  const handleExperiencesOrderChange = newOrder => {
    setExperiencesOrder(newOrder);
  };

  const handleExperiencesCommentChange = (event, key) => {
    console.log('handleExperiencesCommentChange: ', event, key);
    handleMouseUp(event, key);
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
      component: (
        <SummarySection
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          experiences={filteredExperiences}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
          templateType={templateSelected}
          summary={summary}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: true,
      order: finishUpData?.theOrder?.summary || 1,
    },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          templateType={templateSelected}
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          experiences={filteredExperiences}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
          onChangeOrder={sortedExperiences => {
            console.log('New order of experiences:', sortedExperiences);
          }}
        />
      ),
      order: finishUpData?.theOrder?.experiences || 2,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredExperiences !== null,
    },
    {
      id: 'educations',
      component: (
        <EducationsSection
          templateType={templateSelected}
          educations={filteredEducations}
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredEducations !== null,
      order: finishUpData?.theOrder?.educations || 3,
    },
    {
      id: 'involvements',
      component: (
        <InvolvementSection
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
          templateType={templateSelected}
          involvements={filteredInvolvements}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredInvolvements !== null,
      order: finishUpData?.theOrder?.involvements || 4,
    },
    {
      id: 'projects',
      component: (
        <ProjectSection
          templateType={templateSelected}
          projects={filteredProjects}
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredProjects != null,
      order: finishUpData?.theOrder?.projects || 5,
    },
    {
      id: 'certifications',
      component: (
        <CertificationSection
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
          templateType={templateSelected}
          certifications={filteredCertifications}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredCertifications !== null,
      order: finishUpData?.theOrder?.certifications || 6,
    },
    {
      id: 'skills',
      component: (
        <SkillsSection
          isShowCommentBox={fetchedData?.request?.status === 'Done' ? false : true}
          onComment={handleMouseUp}
          onDeleteComment={onDeleteComment}
          templateType={templateSelected}
          skills={filteredSkills}
          onChangeOrder={handleSkillsOrderChange}
        />
      ),
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: filteredSkills !== null,
      order: finishUpData?.theOrder?.skills || 7,
    },
  ];

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

  const handleChangeOverall = event => {
    setOverall(event.target.value);
  };

  const [dataRequest, setDataRequest] = useState();

  const fetchRequest = async () => {
    try {
      console.log('fetchData getReviewRequestsByCandiate');
      const fetchedDataFromAPI = await getRequestList();
      const targetId = params.id; // Assuming params.id is the target ID
      const requestedReview = fetchedDataFromAPI.find(request => request.id == targetId) || null;
      console.log('requestedReview', requestedReview);
      setDataRequest(requestedReview);
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowFinishupCV(false);

        const requestId = params.id;
        const fetchedDataFromAPI = await getReviewResponse(requestId);
        setFetchedData(fetchedDataFromAPI);
        setOverall(fetchedDataFromAPI?.overall);
        const data = fetchedDataFromAPI?.feedbackDetail;
        // const data = await getFinishUp(1)
        // const fetchedData = await getReviewResponse(expertId, requestId);

        console.log('FinishUp data: ', data);

        if (data === null) {
          setErrorMessage('Feedback detail null');
          setFinishUpData(null);
          return;
        }

        setFinishUpData(data);

        setShowFinishupCV(true);

        setTemplateSelected(data.templateType);
        setToolbarState(data.cvStyle);

        setSummary(data.summary);

        // const data1 = await getAudit(cvId);
        // setAuditData(data1);
      } catch (error) {
        if (error?.response?.data?.error) {
          setErrorMessage(error?.response?.data?.error);
        } else if (error?.response?.data) {
          setErrorMessage(error?.response?.data);
        } else {
          setErrorMessage('Some thing went wrong!');
        }

        console.error('Error fetching FinishUp data:', error);
      }
    };
    const selection = window?.getSelection();
    const selectedText = selection?.toString();

    console.log('selectedText: ', selectedText);

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await handleSaveDraft();
      console.log('Save completed.');
      const sendObj = {
        overall: overall,
        cv: finishUpData,
      };
      console.log('Save: ', sendObj);

      await updateReviewResponsePublic(fetchedData.id, sendObj); // Call the syncUp <function styleName=""></function>
      console.log('Save completed.');
      notification.success({
        message: 'Save changed',
      });
      openNotification('bottomRight', `Save changed`);

      router.push('/expert/history');
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
      notification.error({
        message: 'Error',
      });
    }
  };

  const showPromiseConfirmSave = () => {
    confirm({
      title: 'Do you want to save this review?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this review will be Done!',
      async onOk() {
        await handleSave();
      },
      onCancel() {},
    });
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
      notification.success({
        message: 'Save changes',
      });
      openNotification('bottomRight', `Save changed`);
    } catch (error) {
      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };

  const handleSaveDraftWithData = async _finishUpData => {
    try {
      const sendObj = {
        overall: overall,
        cv: _finishUpData,
      };
      console.log('Save: ', sendObj);

      await updateReviewResponse(fetchedData.id, sendObj); // Call the syncUp <function styleName=""></function>
      console.log('Save completed.');
      notification.success({
        message: 'Save changes',
      });
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
          setErrorMessage(error?.response?.data);
          console.error('Error fetching FinishUp data:', error);
        }
      };

      fetchData();
    } catch (error) {
      setErrorMessage(error?.response?.data);

      console.error('Error during synchronization:', error);
      // Handle errors or display an error message.
    }
  };

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };
  const handleActionAccept = async () => {
    try {
      console.log('handleActionAccept ', fetchedData?.request?.id);
      const result = await acceptRequest(params.id);
      // fetchData();
      notification.success({
        message: 'Success',
      });
      const fetchData = async () => {
        try {
          setShowFinishupCV(false);

          const requestId = params.id;
          const fetchedDataFromAPI = await getReviewResponse(requestId);
          setFetchedData(fetchedDataFromAPI);
          setOverall(fetchedDataFromAPI?.overall);

          if (fetchedDataFromAPI.feedbackDetail === null) {
            setErrorMessage('Feedback detail null');
            return;
          }

          const data = fetchedDataFromAPI?.feedbackDetail;

          // const data = await getFinishUp(1)
          // const fetchedData = await getReviewResponse(expertId, requestId);

          console.log('FinishUp data: ', data);

          if (data === null) {
            setFinishUpData(null);
            return;
          }
          const cvId = data?.cvId;
          setFinishUpData(data);

          setShowFinishupCV(true);

          setTemplateSelected(data?.templateType);
          setToolbarState(data?.cvStyle);

          setSummary(data?.summary);

          // const data1 = await getAudit(cvId);
          // setAuditData(data1);
        } catch (error) {
          if (error?.response?.data?.error) {
            setErrorMessage(error?.response?.data?.error);
          } else if (error?.response?.data) {
            setErrorMessage(error?.response?.data);
          } else {
            setErrorMessage('Some thing went wrong!');
          }

          console.error('Error fetching FinishUp data:', error);
        }
      };
      const selection = window?.getSelection();
      const selectedText = selection?.toString();

      console.log('selectedText: ', selectedText);

      fetchData();
    } catch (error) {
      console.log('error ', error);
      notification.error({
        message: 'Error',
      });
    }
  };
  const handleActionReject = async () => {
    try {
      console.log('handleActionReject ', params.id);
      const result = await rejectRequest(params.id);
      notification.success({
        message: 'Success',
      });
      router.push('/expert/requests');
    } catch (error) {
      console.log('error ', error);
      notification.error({
        message: 'Error',
      });
    }
  };

  const showPromiseConfirmAccept = () => {
    confirm({
      title: 'Do you want to save this review?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this review will be Accept!',
      async onOk() {
        await handleActionAccept();
      },
      onCancel() {},
    });
  };
  const showPromiseConfirmReject = () => {
    confirm({
      title: 'Do you want to reject this review?',
      icon: <ExclamationCircleFilled />,
      content: 'When clicked the OK button, this review will be Reject!',
      async onOk() {
        await handleActionReject();
      },
      onCancel() {},
    });
  };
  return (
    <UserLayoutNoAuth
      selected="5"
      isCollapsed={true}
      avatar={avatar}
      email={email}
      userRole={userRole}
      userHeader={
        <UserHeaderExpert initialEnabledCategories={enabledCategories} cvId={params.id} />
      }
      content={
        <div className="flex mt-8">
          {errorMessage && (
            <div>
              <Link href="/expert/requests" passHref>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className="ml-2">Back</span>
              </Link>
              <Alert message="Error Text" description={errorMessage} type="error" />
            </div>
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
            <div className="mr-2 flex flex-col relative">
              <Box
                top={tooltip?.y}
                left={tooltip?.x}
                display={tooltip?.text ? 'block' : 'none'}
                position="absolute"
                zIndex={100}
                className="select-none"
              >
                {
                  <VStack gap={1} bgColor="bg-modal" borderRadius="lg">
                    <Box layerStyle="cardLg" p={3}>
                      <Card
                        styles={{
                          background: 'white',
                          borderRadius: 'lg',
                          witdh: '5px',
                          height: '5px',
                        }}
                      >
                        <CommentOutlined /> Comment
                        <Input
                          value={inputValue}
                          onChange={handleChange}
                          placeholder="Add a comment..."
                          // onFocus={handleMouseDown}
                          onBlur={() => handleInputBlur(selectionRange)}
                        />
                        <div className="mt-4">
                          <Button onClick={onSubmitComment}>Submit</Button>

                          <Button onClick={closeComment} className="ml-4">
                            Close
                          </Button>
                        </div>
                      </Card>
                    </Box>
                  </VStack>
                }
              </Box>
              {finishUpData ? (
                <div className="relative">
                  <div className=" top-10 left-5 " style={{ textAlign: 'left' }}>
                    <Link href="/expert/requests" passHref>
                      <button>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <span className="ml-2">Back</span>
                    </Link>
                  </div>
                  <Card className="mt-4">
                    <div className="flex justify-start">
                      <div style={{ textAlign: 'left' }}>
                        <div>
                          <b>Name:</b> {fetchedData?.request?.name}
                        </div>
                        <div>
                          <b>Status: </b>
                          {fetchedData?.request?.status}
                        </div>
                        <div>
                          <b>Note:</b> {fetchedData?.request?.note}
                        </div>
                        <div>
                          <b>Created Date:</b>{' '}
                          <div> {moment(fetchedData?.request?.receivedDate).fromNow()}</div>{' '}
                          <div style={{ color: 'gray', fontSize: '11px' }}>
                            {moment(fetchedData?.request?.deadline).format('HH:mm:ss DD/MM/YYYY')}
                          </div>{' '}
                        </div>
                        <div>
                          <b>Deadline:</b>{' '}
                          <div> {moment(fetchedData?.request?.deadline).fromNow()}</div>{' '}
                          <div style={{ color: 'gray', fontSize: '11px' }}>
                            {moment(fetchedData?.request?.deadline).format('HH:mm:ss DD/MM/YYYY')}
                          </div>{' '}
                        </div>
                      </div>
                    </div>
                  </Card>
                  {fetchedData?.request?.status === 'Processing' ||
                  fetchedData?.request?.status === 'Accept' ? (
                    <>
                      {' '}
                      <Alert
                        message="Informational Notes"
                        description={
                          <div>
                            <p>
                              To add a comment, selected the text (only description of each section
                              or summary). You will be prompted to enter your comment in a pop-up
                              window. If you want leave the comment for Role, Location, Duration or
                              other, comment on overall in the last of page.
                            </p>
                          </div>
                        }
                        type="info"
                        showIcon
                        className="mt-10"
                        style={{ width: 850 }}
                      />
                    </>
                  ) : null}
                  <Suspense fallback={<div>Loading...</div>}>
                    <CVLayoutReviewerView
                      key={[templateSelected, toolbarState]}
                      layoutStyles={toolbarState}
                      sectionsOrder={sectionsOrder}
                      onSectionsOrderChange={handleSectionsOrderChange}
                    >
                      {filteredSections?.map(
                        section => section.canBeDisplayed && section.component,
                      )}
                    </CVLayoutReviewerView>
                  </Suspense>

                  {fetchedData?.request?.status === 'Waiting' && (
                    <div>
                      {' '}
                      <button
                        style={{
                          height: '30px',
                          marginTop: '10px',
                          marginLeft: '10px',
                          marginBottom: '10px',
                        }}
                        className="button"
                        type=""
                        onClick={() => showPromiseConfirmAccept()}
                      >
                        Accecpt
                      </button>
                      <button
                        style={{
                          height: '30px',
                          marginTop: '10px',
                          marginLeft: '10px',
                          marginBottom: '10px',
                        }}
                        className="button bg-red-500"
                        type=""
                        onClick={() => showPromiseConfirmReject()}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {fetchedData?.request?.status === 'Done' && (
                    <div style={{ marginBottom: '10px' }}>
                      <textarea
                        className="inputEl mb-16"
                        value={overall}
                        disabled={true}
                        onChange={e => handleChangeOverall(e)}
                      />
                      {fetchedData?.score && (
                        <div className="pt-4 ">
                          <div className="flex">
                            <div className=" flex">
                              <p style={{ fontWeight: 'bold', marginRight: '2px' }}>
                                {fetchedData?.score}
                              </p>{' '}
                              <StarFilled style={{ color: '#FFC107' }} />
                            </div>
                            <div className="ml-4 text-gray-500">{fetchedData?.dateComment}</div>
                          </div>
                          <div className="mt-3">
                            {fetchedData?.request ? (
                              <span dangerouslySetInnerHTML={{ __html: fetchedData?.comment }} />
                            ) : (
                              <Empty />
                            )}
                            <div className="flex mt-4">
                              <Avatar shape="square" size="large" src={fetchedData?.user?.avatar} />
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
                  {fetchedData?.request?.status === 'Processing' ||
                  fetchedData?.request?.status === 'Accept' ? (
                    <div>
                      <textarea
                        className="inputEl"
                        value={overall}
                        placeholder="Overall comment"
                        onChange={e => handleChangeOverall(e)}
                      />

                      <button
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
                        onClick={() => showPromiseConfirmSave()}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      }
    />
  );
}
