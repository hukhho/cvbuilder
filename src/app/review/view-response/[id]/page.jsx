/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
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
// import SummarySection from '@/app/components/Templates/SectionComponentsV2/SummarySection';
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
import CVLayoutReviewerView from '@/app/components/Templates/CVLayoutReviewerView';
import { Box, VStack } from '@chakra-ui/react';
import { CommentOutlined, StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import SummarySection from '@/app/components/Templates/SectionComponents/SummarySection';
import EducationsSection from '@/app/components/Templates/SectionComponents/EducationsSection';
import SkillsSection from '@/app/components/Templates/SectionComponents/SkillsSection';
import ProjectSection from '@/app/components/Templates/SectionComponents/ProjectSection';
import CertificationSection from '@/app/components/Templates/SectionComponents/CertificationSection';
import InvolvementSection from '@/app/components/Templates/SectionComponents/InvolvementsSection';
import UserHeaderExpert from '@/app/components/UserHeaderExpert';
import UserHeaderReview from '@/app/components/UserHeaderReview';
import RatingForm from '@/app/components/Form/RatingForm';
import UserLayout from '@/app/components/Layout/UserLayout';
import useStore from '@/store/store';
// import { getRequestList } from '../../reviewServices';

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

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
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

  // to store order of some user's information
  const [experiencesOrder, setExperiencesOrder] = useState([]);
  const [educationsOrder, setEducationsOrder] = useState([]);
  const [skillsOrder, setSkillsOrder] = useState([]);
  const [summary, setSummary] = useState();

  const elementRef = useRef(null); // Reference to the HTML element to be converted

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

  function onSubmitComment() {
    handleSubmitComment(selectionState, selectedTextState);
  }

  function handleSubmitComment(selection, selectedText) {
    const comment = document.createElement('comment');
    comment.textContent = selectedText;
    const commentId = 'comment-' + Date.now(); // Generate a unique comment ID
    comment.setAttribute('id', commentId);
    comment.setAttribute('class', 'select-none comment-marker');
    comment.setAttribute('content', inputValue);
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.addEventListener('click', () => handleDeleteComment(commentId));
    comment.appendChild(deleteButton);
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
      }
    } else {
      console.log('Element with id', currentId, 'not found');
    }
  }

  // Function to handle comment deletion
  function handleDeleteComment(commentId) {
    // const comment = document.getElementById(commentId);
    // if (comment) {
    //   const content = comment.innerHTML; // Get the HTML content including child elements
    //   const commentContent = content.replace(/<span class="delete-button">x<\/span>/, '');
    //   const parent = comment.parentNode;
    //   // Create a new text node from the HTML content
    //   const contentNode = document.createTextNode(commentContent);
    //   // Insert the content node after the comment
    //   parent.insertBefore(contentNode, comment.nextSibling);
    //   // Remove the comment
    //   parent.removeChild(comment);
    // }
  }

  function handleMouseUp(event, key, id, dataId) {
    if (key === null || key === undefined) {
      return;
    }

    // setCurrentId(id);
    // setCurrentDataType(key);
    // setCurrentDataId(dataId);

    // const selection = window.getSelection();
    // setSelectionRange(selection.getRangeAt(0));

    // setSelectionState(selection);
    // const selectedText = selection.toString();
    // setSelectedTextState(selectedText);
    // console.log('selection: ', selection);
    // console.log('FinishUp:handleMouseUp::key: ', key, 'id: ', id, 'dataId: ', dataId);
    // if (selection && selection.toString()) {
    //   const range = selection.getRangeAt(0);
    //   const rect = range.getBoundingClientRect();

    //   const x = rect.left + window.scrollX + rect.width / 2;
    //   const y = rect.top + window.scrollY;

    //   setCurrentText(selectedText);
    //   setTooltip({ x, y, text: selection.toString(), key });
    //   setIsShowComment(true);
    //   console.log('currentText: ', currentText);
    // }
    // console.log('selectedText: ', selectedText);
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
      component: <SummarySection templateType={templateSelected} summary={summary} />,
      canBeDrag: false, // Set to true if this section can be dragged
      canBeDisplayed: true,
    },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          templateType={templateSelected}
          experiences={filteredExperiences}
          onComment={handleMouseUp}
          isShowCommentBox={false}
          onChangeOrder={sortedExperiences => {
            console.log('New order of experiences:', sortedExperiences);
          }}
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
                            {/* <Input
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Add a comment..."
                                onFocus={handleMouseDown}
                              ></Input> */}
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
                            Comment: {overall}
                            <div>Status: {request?.status}</div>
                            <div>Price: {request?.price}</div>
                          </div>
                        </div>
                      </Card>

                      <CVLayoutReviewerView
                        key={[templateSelected, toolbarState]}
                        layoutStyles={toolbarState}
                        sectionsOrder={sectionsOrder}
                        onSectionsOrderChange={handleSectionsOrderChange}
                      >
                        {filteredSections.map(
                          section => section.canBeDisplayed && section.component,
                        )}
                      </CVLayoutReviewerView>
                      <div className="mb-16">
                        {fetchedData?.score === null && (
                          <RatingForm responseId={fetchedData?.id} onCreated={onCreated} />
                        )}
                      </div>
                      <div>
                        {fetchedData?.score && (
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
                        )}
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
