/* eslint-disable */

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
import './styles.moduel.css';
import './editable.moduel.css';
import './alpha.css';
import './template.css';

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
            <div className="">
              <div className="flex -m-4" style={{}}>
                <div
                  className="generator-compiler"
                  data-busy="false"
                  id="resume-preview-container"
                  style={{ position: 'relative', width: '100%' }}
                >
                  <div className="generator-compiler wrapper">
                    <div className="video-wrapper video-wrapper-mobile">
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 125 80"
                        enableBackground="new 0 0 125 80"
                        focusable="false"
                        style={{
                          fill: 'rgb(255, 255, 255)',
                          height: 40,
                          left: 0,
                          strokeWidth: 0,
                          top: '50%',
                          marginTop: '-20px',
                          width: '100%',
                          position: 'absolute',
                        }}
                      >
                        <rect
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="#f3f3f3"
                          width={125}
                          height={80}
                        />
                        <polygon
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="#ffffff"
                          points="53,22 53,58 79,40"
                        />
                      </svg>
                      <div className="video-module" style={{ width: 640, height: 360 }}>
                        <div
                          id="wistia-player-dvdqh"
                          className="wistia_embed wistia_async_09d0j7zwor wistia_embed_initialized"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <div
                            id="wistia_chrome_91"
                            className="w-chrome"
                            tabIndex={-1}
                            style={{
                              display: 'inline-block',
                              height: '100%',
                              lineHeight: 'normal',
                              margin: 0,
                              padding: 0,
                              position: 'relative',
                              verticalAlign: 'top',
                              width: '100%',
                              outline: 'none',
                              overflow: 'hidden',
                              boxSizing: 'content-box',
                            }}
                          >
                            <div id="wistia_grid_100_wrapper" style={{ display: 'block' }}>
                              <div id="wistia_grid_100_above" />
                              <div id="wistia_grid_100_main">
                                <div id="wistia_grid_100_behind" />
                                <div id="wistia_grid_100_center">
                                  <div
                                    className="w-video-wrapper w-css-reset"
                                    style={{
                                      clip: 'rect(0px, 0px, 0px, 0px)',
                                      height: '100%',
                                      position: 'absolute',
                                      top: 0,
                                      width: '100%',
                                      opacity: 1,
                                      backgroundColor: 'rgb(0, 0, 0)',
                                    }}
                                  />
                                  <div
                                    className="w-ui-container"
                                    style={{
                                      height: '100%',
                                      left: 0,
                                      position: 'absolute',
                                      top: 0,
                                      width: '100%',
                                      opacity: 1,
                                    }}
                                  />
                                </div>
                                <div id="wistia_grid_100_front" />
                                <div id="wistia_grid_100_top_inside">
                                  <div id="wistia_grid_100_top" />
                                </div>
                                <div id="wistia_grid_100_bottom_inside">
                                  <div id="wistia_grid_100_bottom" />
                                </div>
                                <div id="wistia_grid_100_left_inside">
                                  <div id="wistia_grid_100_left" />
                                </div>
                                <div id="wistia_grid_100_right_inside">
                                  <div id="wistia_grid_100_right" />
                                </div>
                              </div>
                              <div id="wistia_grid_100_below" />
                              <style
                                id="wistia_101_style"
                                type="text/css"
                                className="wistia_injected_style"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    '#wistia_grid_100_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}\n#wistia_grid_100_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}\n#wistia_grid_100_above{position:relative;}\n#wistia_grid_100_main{display:block;height:100%;position:relative;}\n#wistia_grid_100_behind{height:100%;left:0;position:absolute;top:0;width:100%;}\n#wistia_grid_100_center{height:100%;overflow:hidden;position:relative;width:100%;}\n#wistia_grid_100_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}\n#wistia_grid_100_top_inside{position:absolute;left:0;top:0;width:100%;}\n#wistia_grid_100_top{width:100%;position:absolute;bottom:0;left:0;}\n#wistia_grid_100_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}\n#wistia_grid_100_bottom{width:100%;position:absolute;top:0;left:0;}\n#wistia_grid_100_left_inside{height:100%;position:absolute;left:0;top:0;}\n#wistia_grid_100_left{height:100%;position:absolute;right:0;top:0;}\n#wistia_grid_100_right_inside{height:100%;right:0;position:absolute;top:0;}\n#wistia_grid_100_right{height:100%;left:0;position:absolute;top:0;}\n#wistia_grid_100_below{position:relative;}',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="resume-preview-wrapper" className="resume-preview-wrapper">
                      {/* <div className="toolbar card">
                        <div className="flex flex-col">
                          <div className="flex px-4 py-1">
                            <div className="flex-auto donutContainer">
                              <svg
                                width={52}
                                height={52}
                                xmlns="https://www.w3.org/2000/svg"
                                className="src-components-GeneratorCompiler--6igPcwJlOTA="
                              >
                                <g>
                                  <title>Resume completion</title>
                                  <circle
                                    r={22}
                                    cy={26}
                                    cx={26}
                                    strokeWidth={8}
                                    stroke="#f2f2f2"
                                    fill="none"
                                  />
                                  <circle
                                    id="circle_animation"
                                    className="donut"
                                    r={22}
                                    cy={26}
                                    cx={26}
                                    strokeWidth={8}
                                    stroke="#f2c94b"
                                    fill="none"
                                    style={{ strokeDashoffset: '30.36' }}
                                  />
                                  <text
                                    fill="#283e50"
                                    x="50%"
                                    y="-24px"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    className="src-components-GeneratorCompiler---iJvat0pVKg="
                                  >
                                    78
                                  </text>
                                </g>
                              </svg>
                              <div
                                className="src-components-GeneratorCompiler--RD-qY4wS5FM= src-components-GeneratorCompiler--oypazpT7Vfo="
                                data-score="true"
                              >
                                Explore My Rezi score
                              </div>
                            </div>
                            <div className="src-components-GeneratorCompiler--0cvijpKhQQk=">
                              <span className="src-components-GeneratorCompiler--oC3iOJvBmSQ=">
                                <i
                                  className="fas fa-magic src-components-GeneratorCompiler---kjja11t6fo="
                                  style={{ marginRight: 5 }}
                                  aria-hidden="true"
                                />
                                <span className="src-components-GeneratorCompiler--qdfYq8rjais=">
                                  Auto-adjust
                                  <span
                                    style={{
                                      paddingLeft: 4,
                                      fontSize: '0.8em',
                                      color: 'rgb(204, 204, 204)',
                                    }}
                                  >
                                    BETA
                                  </span>
                                </span>
                              </span>
                              <span
                                data-config="adjustments"
                                className="false src-components-GeneratorCompiler--oC3iOJvBmSQ="
                              >
                                <span className="src-components-GeneratorCompiler--qdfYq8rjais=">
                                  Adjustments
                                </span>
                                <i
                                  className="fad fa-cog src-components-GeneratorCompiler---kjja11t6fo="
                                  aria-hidden="true"
                                />{' '}
                                <svg
                                  xmlns="https://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="src-components-GeneratorCompiler--yxLxsGZBMvw="
                                >
                                  <path d="m5.293 9.707 6 6a.999.999 0 0 0 1.414 0l6-6a.999.999 0 1 0-1.414-1.414L12 13.586 6.707 8.293a.999.999 0 1 0-1.414 1.414z" />
                                </svg>
                              </span>
                              <span className="src-components-GeneratorCompiler--RGfVJbHXONM=">
                                <span
                                  className="src-components-GeneratorCompiler--qdfYq8rjais="
                                  style={{ paddingRight: 15 }}
                                >
                                  Template
                                </span>
                                <i
                                  className="fad fa-paint-brush src-components-GeneratorCompiler---kjja11t6fo="
                                  aria-hidden="true"
                                />
                              </span>
                              <div
                                className="z-50 src-components-GeneratorCompiler-DownloadAction--oqHJ808Hvqg="
                                data-config="adjustments"
                              >
                                <span className="src-components-GeneratorCompiler-DownloadAction--qUaFt6-r3S8=">
                                  Download
                                </span>
                                <i
                                  className="fad fa-file-download src-components-GeneratorCompiler-DownloadAction--vUOsPGxU-HI="
                                  aria-hidden="true"
                                />{' '}
                                <svg
                                  xmlns="https://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="src-components-GeneratorCompiler-DownloadAction--A8QQvhpuXiM="
                                >
                                  <path d="m5.293 9.707 6 6a.999.999 0 0 0 1.414 0l6-6a.999.999 0 1 0-1.414-1.414L12 13.586 6.707 8.293a.999.999 0 1 0-1.414 1.414z" />
                                </svg>
                                <div className="src-components-GeneratorCompiler-DownloadAction--S4g-Jktt-yk=">
                                  <span
                                    className="finish-up-section src-components-GeneratorCompiler-DownloadAction--Qed074HiM9Q="
                                    id="finish-up-section-download-pdf"
                                  >
                                    <i className="fad fa-file-pdf" aria-hidden="true" />
                                    Export .PDF
                                  </span>
                                  <span
                                    className="finish-up-section src-components-GeneratorCompiler-DownloadAction--Qed074HiM9Q="
                                    id="finish-up-section-download-docx"
                                  >
                                    <i className="fad fa-file-word" aria-hidden="true" />
                                    Export .DOCX
                                  </span>
                                  <span
                                    className="finish-up-section src-components-GeneratorCompiler-DownloadAction--Qed074HiM9Q="
                                    id="finish-up-section-download-drive authorize_button"
                                  >
                                    <i
                                      className="fab fa-google-drive"
                                      style={{ color: 'rgb(185, 185, 185)', left: 16 }}
                                      aria-hidden="true"
                                    />{' '}
                                    SAVE TO DRIVE
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start flex-wrap items-center bg-neutral-50 rounded-b-[0.5em] font-semibold select-none gap-y-2 h-[0px] opacity-0 pointer-events-none overflow-hidden px-4 transition-all ease-in-out duration-300">
                            <div className="flex space-x-[4px]">
                              <button className="relative   min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent  bg-blue-100 ">
                                <i className="fas fa-icons" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Icons
                                </div>
                              </button>
                              <button className="relative   min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent [&:not(.flat)]:bg-neutral-100 [&:not(.flat)]:hover:bg-neutral-200/50 hover:bg-neutral-200/50">
                                <i className="fas fa-user-circle" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Profile picture
                                </div>
                              </button>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <div className="relative group text-[16px] origin-bottom-left">
                                <button className="flex items-center space-x-2.5 px-[8px] h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50">
                                  <span className="font-semibold uppercase text-[12px]">
                                    Merriweather
                                  </span>
                                  <i className="far fa-angle-down mt-[2px] " aria-hidden="true" />
                                </button>
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Font
                                </div>
                              </div>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <button className="relative  flat min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent [&:not(.flat)]:bg-neutral-100 [&:not(.flat)]:hover:bg-neutral-200/50 hover:bg-neutral-200/50">
                                <i className="far fa-minus" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Decrease font size
                                </div>
                              </button>
                              <div className="text-[16px] w-7 text-center">
                                <span className="text-[12px]">9.5</span>
                              </div>
                              <button className="relative  flat min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent [&:not(.flat)]:bg-neutral-100 [&:not(.flat)]:hover:bg-neutral-200/50 hover:bg-neutral-200/50">
                                <i className="far fa-plus" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Increase font size
                                </div>
                              </button>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <div className="relative group text-[16px] origin-bottom-left">
                                <button className="flex items-center space-x-2.5 px-[8px] h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50">
                                  <i className="fas fa-line-height " aria-hidden="true" />
                                  <span className="font-semibold uppercase w-7 text-center text-[12px]">
                                    1.5
                                  </span>
                                  <i className="far fa-angle-down mt-[2px] " aria-hidden="true" />
                                </button>
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Line height
                                </div>
                              </div>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <div className="relative group text-[16px] origin-bottom-left">
                                <button className="flex items-center space-x-2.5 px-[8px] h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50">
                                  <span className="font-semibold uppercase text-[12px]">
                                    Letter
                                  </span>
                                  <i className="far fa-angle-down mt-[2px] " aria-hidden="true" />
                                </button>
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Paper size
                                </div>
                              </div>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <div className="relative group text-[16px] origin-bottom-left">
                                <button className="flex items-center space-x-2.5 px-[8px] h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50">
                                  <span className="font-semibold uppercase w-7 text-center text-[12px]">
                                    105%
                                  </span>
                                  <i className="far fa-angle-down mt-[2px] " aria-hidden="true" />
                                </button>
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Zoom
                                </div>
                              </div>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex space-x-[4px]">
                              <button className="relative   min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent  bg-blue-100 ">
                                <i className="fas fa-horizontal-rule mt-1.5" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Section divider
                                </div>
                              </button>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex space-x-[4px]">
                              <button className="relative   min-w-[36px] h-[32px] text-[16px] rounded-md block [&:not(.flat)]:disabled:bg-neutral-100 [&:not(.flat)]:disabled:text-neutral-400 disabled:hover:bg-transparent [&:not(.flat)]:bg-neutral-100 [&:not(.flat)]:hover:bg-neutral-200/50 hover:bg-neutral-200/50">
                                <i className="fas fa-indent mt-1.5" aria-hidden="true" />
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Indent
                                </div>
                              </button>
                            </div>
                            <hr className="h-[24px] border-l mx-[4px] border-slate-200" />
                            <div className="flex items-center">
                              <div className="relative group text-[16px] origin-bottom-left">
                                <button className="flex items-center space-x-2.5 px-[8px] h-[32px] w-full rounded-md disabled:hover:bg-transparent hover:bg-neutral-200/50">
                                  <span className="font-semibold uppercase text-[12px]">
                                    <div
                                      className="text-[12px] w-[20px] h-[20px] rounded-full"
                                      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                                    />
                                  </span>
                                  <i className="far fa-angle-down mt-[2px] " aria-hidden="true" />
                                </button>
                                <div className="opacity-0 z-50 absolute pointer-events-none whitespace-nowrap transition-opacity -bottom-8 w-fit min-w-fit rounded-[4px] text-[13px] text-white font-normal transform -translate-x-1/2 left-1/2 px-2 py-0.5 bg-[#1E293B] before:border-[7px] before:border-r-transparent before:border-l-transparent before:border-t-transparent before:absolute before:-top-[12px] before:-translate-x-1/2 before:left-1/2 before:border-[#1E293B] ">
                                  Accent color
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="preview card">
                        <div
                          className="bg-gray-100 rounded-md p-4 select-none text-[#2e3d50]"
                          id="resume-preview"
                          style={{ transform: 'scale(1.05071)', transformOrigin: 'left top' }}
                        >
                          <div
                            style={{
                              backgroundColor: 'rgb(255, 255, 255)',
                              minHeight: '11in',
                              paddingBottom: '1.3cm',
                            }}
                          >
                            <div
                              id="resume"
                              className="relative bg-white transition-colors resume"
                              data-type="designStudio"
                              data-format="letter"
                              data-template="standard"
                              style={{
                                fontSize: '9.5pt',
                                lineHeight: '1.5',
                                width: '8.5in',
                                transform: 'initial',
                                transformOrigin: 'initial',
                                fontFamily: 'Merriweather, serif',
                                padding: '1.3cm 0cm 0cm',
                                borderColor: 'rgb(0, 0, 0)',
                                textAlign: 'left',
                              }}
                            >
                              <div
                                className="design-studio-break-page"
                                style={{
                                  top: 'calc(10.4882in)',
                                  fontFamily: '"Source Sans Pro", sans-serif',
                                  lineHeight: 20,
                                }}
                              >
                                <div />
                                Break
                              </div>
                              <div
                                id="sortable-area"
                                className="relative z-50 mb-[10px] transition-all"
                              >
                                <div className="">
                                  <div
                                    className="flex flex-row items-end gap-4 pb-2"
                                    style={{ paddingLeft: '1.4cm', paddingRight: '1.4cm' }}
                                  >
                                    <div className="grow">
                                      <h1
                                        className="font-bold text-center"
                                        style={{
                                          color: 'rgb(0, 0, 0)',
                                          fontSize: '1.65em',
                                          fontFamily: 'Merriweather, serif',
                                          lineHeight: 'inherit',
                                        }}
                                      >
                                        Charles Bloomberg
                                      </h1>
                                      <div
                                        className="pt-[2px] text-center false"
                                        style={{
                                          color: 'rgb(46, 61, 80)',
                                          fontWeight: 300,
                                          fontSize: '0.75em',
                                        }}
                                      >
                                        <ul className="inline-block mr-1">
                                          <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                                            New York City
                                          </li>
                                          <li className="inline-block [&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-1">
                                            United States
                                          </li>
                                        </ul>
                                        <span className="inline-block mr-1">
                                          <svg
                                            xmlns="https://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="contact-icon inline-block mr-1"
                                            width="0.9em"
                                            height="0.9em"
                                            style={{ fill: 'rgb(46, 61, 80)' }}
                                          >
                                            <path d="M20.016 8.016V6L12 11.016 3.984 6v2.016L12 12.985zm0-4.032q.797 0 1.383.609t.586 1.406v12q0 .797-.586 1.406t-1.383.609H3.985q-.797 0-1.383-.609t-.586-1.406v-12q0-.797.586-1.406t1.383-.609h16.031z" />
                                          </svg>
                                          charlesbloomberg@wisc.edu
                                        </span>
                                        <span className="inline-block mr-1">
                                          <svg
                                            xmlns="https://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="contact-icon inline-block mr-1"
                                            width="0.9em"
                                            height="0.9em"
                                            style={{ fill: 'rgb(46, 61, 80)' }}
                                          >
                                            <path d="M19.5 0h-15A1.5 1.5 0 0 0 3 1.5v21A1.5 1.5 0 0 0 4.5 24h15a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 19.5 0zM18 18H6V3h12z" />
                                          </svg>
                                          (621) 799-5548
                                        </span>
                                        <span className="inline-block mr-1">
                                          <svg
                                            xmlns="https://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="contact-icon inline-block mr-1"
                                            width="0.9em"
                                            height="0.9em"
                                            style={{ fill: 'rgb(46, 61, 80)' }}
                                          >
                                            <path d="M21.75 0H2.25A2.257 2.257 0 0 0 0 2.25v19.5A2.257 2.257 0 0 0 2.25 24h19.5A2.257 2.257 0 0 0 24 21.75V2.25A2.257 2.257 0 0 0 21.75 0zM9 19.5H6V9h3zm-1.5-12C6.67 7.5 6 6.83 6 6s.67-1.5 1.5-1.5S9 5.17 9 6s-.67 1.5-1.5 1.5zm12 12h-3v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6h-3V9h3v1.861C14.119 10.013 15.066 9 16.125 9c1.866 0 3.375 1.678 3.375 3.75z" />
                                          </svg>
                                          in/bloomberg
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                    <hr />
                                  </div>
                                </div>
                                <ul className="sortable-container col-span-12 z-10">
                                  <li
                                    className="summary leading-snug relative group "
                                    style={{ marginBottom: 8 }}
                                  >
                                    <i
                                      className="fas fa-sort absolute left-[20px] top-0 top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                      aria-hidden="true"
                                    />
                                    <div>
                                      <div
                                        className="uppercase mb-[4px]   "
                                        style={{
                                          fontWeight: 600,
                                          padding: '0cm 1.4cm',
                                          lineHeight: '1.35em',
                                        }}
                                      >
                                        <span
                                          className="editableContent cursor-text  designStudio "
                                          id="summary-heading"
                                          tabIndex={0}
                                          contentEditable="true"
                                          style={{
                                            color: 'rgb(46, 61, 80)',
                                            fontSize: '1.15em',
                                            display: 'block',
                                          }}
                                        >
                                          Summary
                                        </span>
                                        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
                                      </div>
                                      <div
                                        className="relative whitespace-pre-line cursor-text focus:outline-none"
                                        style={{
                                          color: 'rgb(46, 61, 80)',
                                          fontWeight: 100,
                                          fontSize: '0.85em',
                                          lineHeight: '1.6em',
                                          padding: '0cm 1.4cm',
                                        }}
                                      >
                                        <div className="relative">
                                          <p className="editableContent ghost-hightlight w-full designStudio ">
                                            <span>
                                              <span className="">
                                                A production professional with experience creating
                                                solutions for the most demanding video content
                                                challenges. I’m a proven successful collaborator
                                                with multi-disciplinary teams, artists and
                                                personalities.
                                              </span>
                                            </span>
                                          </p>
                                        </div>
                                        <p
                                          className="editableContent cursor-text  designStudio "
                                          id="summary-summary"
                                          tabIndex={0}
                                          contentEditable="true"
                                        >
                                          A production professional with experience creating
                                          solutions for the most demanding video content challenges.
                                          I’m a proven successful collaborator with
                                          multi-disciplinary teams, artists and personalities.
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                      <hr />
                                    </div>
                                  </li>
                                  <li
                                    className="experience leading-snug relative group "
                                    style={{ marginBottom: 8 }}
                                  >
                                    <i
                                      className="fas fa-sort absolute left-[20px] top-0 top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                      aria-hidden="true"
                                    />
                                    <div className="">
                                      <div
                                        className="uppercase mb-[4px]   "
                                        style={{
                                          fontWeight: 600,
                                          padding: '0cm 1.4cm',
                                          lineHeight: '1.35em',
                                        }}
                                      >
                                        <span
                                          className="editableContent cursor-text  designStudio "
                                          id="experience-heading"
                                          tabIndex={0}
                                          contentEditable="true"
                                          style={{
                                            color: 'rgb(46, 61, 80)',
                                            fontSize: '1.15em',
                                            display: 'block',
                                          }}
                                        >
                                          Experience
                                        </span>
                                        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ lineHeight: '1.6em' }}
                                      >
                                        <ul className="sortable-container ">
                                          <li
                                            className="smpl125032021 leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="smpl125032021-role"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      acc
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="smpl125032021-company"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      cc
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute "
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-0 designStudio "
                                                      id="smpl125032021-duration"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      June 2019 - June 2020
                                                    </span>
                                                  </div>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-2 designStudio "
                                                      id="smpl125032021-location"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      New York, NY
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="text-[0.85em] relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">• cc</span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="smpl125032021-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • cc
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="smpl025032021 leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="smpl025032021-role"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      Creative Producer
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="smpl025032021-company"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      Company A
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute "
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-0 designStudio "
                                                      id="smpl025032021-duration"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      June 2020 - Present
                                                    </span>
                                                  </div>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-2 designStudio "
                                                      id="smpl025032021-location"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      New York, NY
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="text-[0.85em] relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      • Functions internally with executive and
                                                      marketing teams on the creation of video
                                                      content, photography and graphic design. •
                                                      Sole producer in the company, owning all
                                                      visual content. • Coordinates with technical
                                                      teams, executive teams and sales to produce
                                                      messaging and content. • Leader of
                                                      communications efforts including production
                                                      for press, trade shows and collaboration with
                                                      automotive partners.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="smpl025032021-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • Functions internally with executive and marketing
                                                teams on the creation of video content, photography
                                                and graphic design. • Sole producer in the company,
                                                owning all visual content. • Coordinates with
                                                technical teams, executive teams and sales to
                                                produce messaging and content. • Leader of
                                                communications efforts including production for
                                                press, trade shows and collaboration with automotive
                                                partners.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="ncQ-wVn_6 leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="ncQ-wVn_6-role"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      c
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="ncQ-wVn_6-company"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      c
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute "
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-0 designStudio "
                                                      id="ncQ-wVn_6-duration"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      February 2023 -October 2023
                                                    </span>
                                                  </div>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-2 designStudio "
                                                      id="ncQ-wVn_6-location"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      c
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="text-[0.85em] relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">• c</span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="ncQ-wVn_6-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • c
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="-btVlug1A3 leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="-btVlug1A3-role"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      C
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-semibold"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="-btVlug1A3-company"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      C
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute "
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-0 designStudio "
                                                      id="-btVlug1A3-duration"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      February 2023 -October 2023
                                                    </span>
                                                  </div>
                                                  <div
                                                    className="inline-block before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text leading-snug ml-2 designStudio "
                                                      id="-btVlug1A3-location"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      C
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="text-[0.85em] relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">• C</span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="-btVlug1A3-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • C
                                              </p>
                                            </div>
                                          </li>
                                        </ul>
                                        <div id="DndDescribedBy-2" style={{ display: 'none' }}>
                                          To pick up a draggable item, press the space bar. While
                                          dragging, use the arrow keys to move the item. Press space
                                          again to drop the item in its new position, or press
                                          escape to cancel.
                                        </div>
                                        <div
                                          id="DndLiveRegion-1"
                                          role="status"
                                          aria-live="assertive"
                                          aria-atomic="true"
                                          style={{
                                            position: 'fixed',
                                            width: 1,
                                            height: 1,
                                            margin: '-1px',
                                            border: 0,
                                            padding: 0,
                                            overflow: 'hidden',
                                            clip: 'rect(0px, 0px, 0px, 0px)',
                                            clipPath: 'inset(100%)',
                                            whiteSpace: 'nowrap',
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                      <hr />
                                    </div>
                                  </li>
                                  <li
                                    className="projects leading-snug relative group "
                                    style={{ marginBottom: 8 }}
                                  >
                                    <i
                                      className="fas fa-sort absolute left-[20px] top-0 top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                      aria-hidden="true"
                                    />
                                    <div className="">
                                      <div
                                        className="uppercase mb-[4px]   "
                                        style={{
                                          fontWeight: 600,
                                          padding: '0cm 1.4cm',
                                          lineHeight: '1.35em',
                                        }}
                                      >
                                        <span
                                          className="editableContent cursor-text  designStudio "
                                          id="projects-heading"
                                          tabIndex={0}
                                          contentEditable="true"
                                          style={{
                                            color: 'rgb(46, 61, 80)',
                                            fontSize: '1.15em',
                                            display: 'block',
                                          }}
                                        >
                                          Projects
                                        </span>
                                        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
                                      </div>
                                      <div
                                        className="flex flex-col"
                                        style={{ lineHeight: '1.6em' }}
                                      >
                                        <ul className="sortable-container ">
                                          <li
                                            className="mgSrie3Jg leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1.2em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="mgSrie3Jg-title"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      Director &amp; Editor
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="mgSrie3Jg-organization"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      Apple
                                                    </span>
                                                  </span>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="mgSrie3Jg-date"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      September, 2017
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }} />
                                              </div>
                                            </div>
                                            <div
                                              className="relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      • Directed and edited the introduction video
                                                      for the iPhone X keynote. • Filming began at
                                                      8:00am, and rolled to stream at 9:55am. •
                                                      Captured the first official aerial footage of
                                                      Apple Park and Steve Jobs Theater. •
                                                      Collaborated alongside Apple Marcom team and
                                                      the keynote's director to achieve desired end
                                                      result.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="mgSrie3Jg-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • Directed and edited the introduction video for the
                                                iPhone X keynote. • Filming began at 8:00am, and
                                                rolled to stream at 9:55am. • Captured the first
                                                official aerial footage of Apple Park and Steve Jobs
                                                Theater. • Collaborated alongside Apple Marcom team
                                                and the keynote's director to achieve desired end
                                                result.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="88E7br1tz leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1.2em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="88E7br1tz-title"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      Editor
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="88E7br1tz-organization"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      ClassAcademy
                                                    </span>
                                                  </span>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="88E7br1tz-date"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      2020
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }} />
                                              </div>
                                            </div>
                                            <div
                                              className="relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      • Completed all post production on an animated
                                                      educational program for kids. • Collaborated
                                                      on creating the "Hypermesh" workflow, allowing
                                                      animators to seamlessly deliver assets to
                                                      editors. • Wrote story beats, episode outlines
                                                      and jokes with the head writer, and members of
                                                      the team.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="88E7br1tz-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • Completed all post production on an animated
                                                educational program for kids. • Collaborated on
                                                creating the "Hypermesh" workflow, allowing
                                                animators to seamlessly deliver assets to editors. •
                                                Wrote story beats, episode outlines and jokes with
                                                the head writer, and members of the team.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="hztSOwCHD leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: 11,
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1.2em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="hztSOwCHD-title"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      Director &amp; DoP
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="hztSOwCHD-organization"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      Waze
                                                    </span>
                                                  </span>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="hztSOwCHD-date"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      2016-2018
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }} />
                                              </div>
                                            </div>
                                            <div
                                              className="relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      • Recurring producing, directing and editing
                                                      of projects for Waze and Google marketing
                                                      efforts. • Managed the tone and visual
                                                      delivery of stories, advertisements and
                                                      promotional materials. • Created visual assets
                                                      and effects to demonstrate Waze's relationship
                                                      with users.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="hztSOwCHD-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • Recurring producing, directing and editing of
                                                projects for Waze and Google marketing efforts. •
                                                Managed the tone and visual delivery of stories,
                                                advertisements and promotional materials. • Created
                                                visual assets and effects to demonstrate Waze's
                                                relationship with users.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="QXZ2kqKlE leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div className="" style={{ lineHeight: '1.2em' }}>
                                              <div className="flex gap-2">
                                                <span
                                                  className="text-[#000000]"
                                                  style={{ color: 'rgb(0, 0, 0)' }}
                                                >
                                                  <div
                                                    className="inline-block font-semibold text-[1em] before:first:hidden before:absolute before:content-[',_']"
                                                    style={{ color: 'rgb(0, 0, 0)' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text text-[1em] leading-snug ml-0 designStudio "
                                                      id="QXZ2kqKlE-title"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                    >
                                                      Editor, Original Programming
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div className="flex gap-2 justify-between font-semibold">
                                                <div style={{ color: 'rgb(46, 61, 80)' }}>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="QXZ2kqKlE-organization"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      Amazon
                                                    </span>
                                                  </span>
                                                  <span
                                                    className="before:first:hidden before:content-['•_'] before:mr-0.5 font-normal"
                                                    style={{ fontSize: '0.85em' }}
                                                  >
                                                    <span
                                                      className="editableContent cursor-text mr-1 whitespace-pre-wrap designStudio "
                                                      id="QXZ2kqKlE-date"
                                                      tabIndex={0}
                                                      contentEditable="true"
                                                      style={{
                                                        display: 'inline',
                                                        verticalAlign: 'initial',
                                                      }}
                                                    >
                                                      December, 2016
                                                    </span>
                                                  </span>
                                                </div>
                                                <div style={{ color: 'rgb(46, 61, 80)' }} />
                                              </div>
                                            </div>
                                            <div
                                              className="relative whitespace-pre-line "
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                lineHeight: '1.6em',
                                                fontSize: '0.85em',
                                                fontWeight: 100,
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      • Executed all post production, graphic design
                                                      and visual effects. • Prepared content for
                                                      quality control and delivery to Amazon's video
                                                      platform.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio "
                                                id="QXZ2kqKlE-description"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                • Executed all post production, graphic design and
                                                visual effects. • Prepared content for quality
                                                control and delivery to Amazon's video platform.
                                              </p>
                                            </div>
                                          </li>
                                        </ul>
                                        <div id="DndDescribedBy-3" style={{ display: 'none' }}>
                                          To pick up a draggable item, press the space bar. While
                                          dragging, use the arrow keys to move the item. Press space
                                          again to drop the item in its new position, or press
                                          escape to cancel.
                                        </div>
                                        <div
                                          id="DndLiveRegion-2"
                                          role="status"
                                          aria-live="assertive"
                                          aria-atomic="true"
                                          style={{
                                            position: 'fixed',
                                            width: 1,
                                            height: 1,
                                            margin: '-1px',
                                            border: 0,
                                            padding: 0,
                                            overflow: 'hidden',
                                            clip: 'rect(0px, 0px, 0px, 0px)',
                                            clipPath: 'inset(100%)',
                                            whiteSpace: 'nowrap',
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                      <hr />
                                    </div>
                                  </li>
                                  <li
                                    className="skills leading-snug relative group "
                                    style={{ marginBottom: 8 }}
                                  >
                                    <i
                                      className="fas fa-sort absolute left-[20px] top-0 top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                      aria-hidden="true"
                                    />
                                    <div className="">
                                      <div
                                        className="uppercase mb-[4px]   "
                                        style={{
                                          fontWeight: 600,
                                          padding: '0cm 1.4cm',
                                          lineHeight: '1.35em',
                                        }}
                                      >
                                        <span
                                          className="editableContent cursor-text  designStudio "
                                          id="skills-heading"
                                          tabIndex={0}
                                          contentEditable="true"
                                          style={{
                                            color: 'rgb(46, 61, 80)',
                                            fontSize: '1.15em',
                                            display: 'block',
                                          }}
                                        >
                                          Skills
                                        </span>
                                        <hr className="border-0 border-b-[1px] border-black mt-[1px]" />
                                      </div>
                                      <div className="flex flex-col" style={{ lineHeight: '2em' }}>
                                        <ul className="sortable-container ">
                                          <li
                                            className="zBkM-K9OU leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: '6.75px',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div
                                              className="relative whitespace-pre-line"
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                fontWeight: 700,
                                                fontSize: '0.85em',
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      Video production, from start to finish.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio  "
                                                id="zBkM-K9OU-skill"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                Video production, from start to finish.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="a8Bz4mfTG leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: '6.75px',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div
                                              className="relative whitespace-pre-line"
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                fontWeight: 700,
                                                fontSize: '0.85em',
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      Post: Expert in Final Cut Pro, Premiere,
                                                      DaVinci Resolve and After Effects. Experienced
                                                      in media management, compression and delivery
                                                      workflows. Additional proficiencies in
                                                      Cinema4D and Figma.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio  "
                                                id="a8Bz4mfTG-skill"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                Post: Expert in Final Cut Pro, Premiere, DaVinci
                                                Resolve and After Effects. Experienced in media
                                                management, compression and delivery workflows.
                                                Additional proficiencies in Cinema4D and Figma.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="6tX0rRrdt leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                              marginBottom: '6.75px',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div
                                              className="relative whitespace-pre-line"
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                fontWeight: 700,
                                                fontSize: '0.85em',
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      Pre-Production: Content development,
                                                      collaborative scriptwriting &amp;
                                                      storyboarding, production timelines and
                                                      production management.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio  "
                                                id="6tX0rRrdt-skill"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                Pre-Production: Content development, collaborative
                                                scriptwriting &amp; storyboarding, production
                                                timelines and production management.
                                              </p>
                                            </div>
                                          </li>
                                          <li
                                            className="ji5ai3a2w leading-snug relative group "
                                            style={{
                                              paddingLeft: '1.4cm',
                                              paddingRight: '1.4cm',
                                            }}
                                          >
                                            <i
                                              className="fas fa-sort absolute left-[20px] null top-1 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-300 cursor-grab z-50 "
                                              aria-hidden="true"
                                            />
                                            <div
                                              className="relative whitespace-pre-line"
                                              style={{
                                                color: 'rgb(46, 61, 80)',
                                                fontWeight: 700,
                                                fontSize: '0.85em',
                                              }}
                                            >
                                              <div className="relative">
                                                <p className="editableContent ghost-hightlight w-full designStudio ">
                                                  <span>
                                                    <span className="">
                                                      Production: Camera operation of platforms and
                                                      support solutions, sound &amp; lighting,
                                                      direction and crew management.
                                                    </span>
                                                  </span>
                                                </p>
                                              </div>
                                              <p
                                                className="editableContent cursor-text  designStudio  "
                                                id="ji5ai3a2w-skill"
                                                tabIndex={0}
                                                contentEditable="true"
                                              >
                                                Production: Camera operation of platforms and
                                                support solutions, sound &amp; lighting, direction
                                                and crew management.
                                              </p>
                                            </div>
                                          </li>
                                        </ul>
                                        <div id="DndDescribedBy-4" style={{ display: 'none' }}>
                                          To pick up a draggable item, press the space bar. While
                                          dragging, use the arrow keys to move the item. Press space
                                          again to drop the item in its new position, or press
                                          escape to cancel.
                                        </div>
                                        <div
                                          id="DndLiveRegion-3"
                                          role="status"
                                          aria-live="assertive"
                                          aria-atomic="true"
                                          style={{
                                            position: 'fixed',
                                            width: 1,
                                            height: 1,
                                            margin: '-1px',
                                            border: 0,
                                            padding: 0,
                                            overflow: 'hidden',
                                            clip: 'rect(0px, 0px, 0px, 0px)',
                                            clipPath: 'inset(100%)',
                                            whiteSpace: 'nowrap',
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ padding: '0cm 1.4cm', margin: '10px 0px' }}>
                                      <hr />
                                    </div>
                                  </li>
                                </ul>
                                <div id="DndDescribedBy-1" style={{ display: 'none' }}>
                                  To pick up a draggable item, press the space bar. While dragging,
                                  use the arrow keys to move the item. Press space again to drop the
                                  item in its new position, or press escape to cancel.
                                </div>
                                <div
                                  id="DndLiveRegion-4"
                                  role="status"
                                  aria-live="assertive"
                                  aria-atomic="true"
                                  style={{
                                    position: 'fixed',
                                    width: 1,
                                    height: 1,
                                    margin: '-1px',
                                    border: 0,
                                    padding: 0,
                                    overflow: 'hidden',
                                    clip: 'rect(0px, 0px, 0px, 0px)',
                                    clipPath: 'inset(100%)',
                                    whiteSpace: 'nowrap',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </ConfigProvider>
    </main>
  );
}
