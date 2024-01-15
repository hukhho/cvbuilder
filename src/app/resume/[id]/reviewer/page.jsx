/* eslint-disable */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, ConfigProvider, Divider, Input, Modal, Result } from 'antd';
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
} from './finishUpService';
import ScoreFinishUp from './Score';
import VideoComponent from '@/app/components/VideoComponent';
import './expert.css';
import './gen.css';
import GenericPdfDownloader from '@/app/components/Templates/GenericPdfDownloader';
import CVLayoutReviewerView from '@/app/components/Templates/CVLayoutReviewerView';
import { Box, VStack } from '@chakra-ui/react';
import { CommentOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
  const [fetchedData, setFetchedData] = useState(null);

  const [templateData, setTemplateData] = useState(null);
  const [showFinishupCV, setShowFinishupCV] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState({
    'FINISH UP': true,
  });

  const [templateSelected, setTemplateSelected] = useState(mockData.data.resume.templateType);
  const [toolbarState, setToolbarState] = useState(mockData.data.resume.resumeStyle);

  useEffect(() => {
    console.log('Toolbar state changed:', toolbarState);
  }, [toolbarState]);

  // const { resumeInfo } = finishUpData;
  const { educations, projects, involvements, certifications, skills, experiences } =
    finishUpData || {};
  experiences?.sort((a, b) => a.theOrder - b.theOrder);
  projects?.sort((a, b) => a.theOrder - b.theOrder);
  involvements?.sort((a, b) => a.theOrder - b.theOrder);
  certifications?.sort((a, b) => a.theOrder - b.theOrder);
  skills?.sort((a, b) => a.theOrder - b.theOrder);
  educations?.sort((a, b) => a.theOrder - b.theOrder);
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
  }

  function handleMouseUp(event, key, id, dataId) {
    if (key === null || key === undefined) {
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
    // {
    //   id: 'summary',
    //   component: <SummarySection templateType={templateSelected} summary={summary} />,
    //   canBeDrag: true, // Set to true if this section can be dragged
    //   canBeDisplayed: true,
    // },
    {
      id: 'experiences',
      component: (
        <ExperiencesSection
          templateType={templateSelected}
          experiences={experiences}
          onComment={handleMouseUp}
          onChangeOrder={sortedExperiences => {
            console.log('New order of experiences:', sortedExperiences);
          }}
        />
      ),
      canBeDrag: true, // Set to true if this section can be dragged
      canBeDisplayed: experiences !== null,
    },
    // {
    //   id: 'educations',
    //   component: <EducationsSection templateType={templateSelected} educations={educations} />,
    //   canBeDrag: true, // Set to true if this section can be dragged
    //   canBeDisplayed: educations !== null,
    // },
    // {
    //   id: 'skills',
    //   component: (
    //     <SkillsSection
    //       templateType={templateSelected}
    //       skills={skills}
    //       onChangeOrder={handleSkillsOrderChange}
    //     />
    //   ),
    //   canBeDrag: true, // Set to true if this section can be dragged
    //   canBeDisplayed: skills !== null,
    // },
  ];
  const [overall, setOverall] = useState(fetchedData?.overall ? fetchedData.overall : '');

  const handleChangeOverall = event => {
    setOverall(event.target.value);
  };

  useEffect(() => {
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
        console.error('Error fetching FinishUp data:', error);
      }
    };
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

      await updateReviewResponse(fetchedData.id, sendObj); // Call the syncUp <function styleName=""></function>
      console.log('Save completed.');
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

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <></>
            // <UserCVBuilderHeader initialEnabledCategories={enabledCategories} cvId={params.id} />
          }
          content={
            <div className="flex mt-8">
              {finishUpData ? (
                <></>
              ) : (
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={
                    <Link href="/">
                      <Button type="primary">Back Home</Button>
                    </Link>
                  }
                />
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
                      <CVLayoutReviewerView
                        key={[templateSelected, toolbarState]}
                        layoutStyles={toolbarState}
                        sectionsOrder={sectionsOrder}
                        onSectionsOrderChange={handleSectionsOrderChange}
                      >
                        {sections.map(section => section.canBeDisplayed && section.component)}
                      </CVLayoutReviewerView>
                      <div>
                        <textarea
                          className="inputEl"
                          value={overall}
                          onChange={e => handleChangeOverall(e)}
                        >
                          Comment for Cv
                        </textarea>
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
                        </button>
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
