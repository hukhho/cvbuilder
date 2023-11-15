/* eslint-disable */

import React, { useEffect, useState } from 'react';
import './preview.css';
import getCoverLetter from './getCoverLetter';
import { Button, Card, Popover, Tooltip } from 'antd';
import { Box, ChakraProvider, VStack } from '@chakra-ui/react';
import { CommentOutlined } from '@ant-design/icons';

function ResumeGenerator() {
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontSize, setFontSize] = useState(9);
  const [zoom, setZoom] = useState(100);
  const [content, setContent] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    introDate: 'April 20, 2023',
    company: '',
    addressto: 'Dear Google',
    content:
      "Dear Hiring Manager,\n\nI am writing to express my interest in the Java position at your company. With my background in production and experience in collaborating with multi-disciplinary teams, I believe I have the skills and mindset necessary to excel in this role.\n\nIn my previous role as a Creative Producer at Company A, I worked closely with executive and marketing teams to create compelling video content, photography, and graphic design. I was the sole producer in the company, responsible for all visual content. This experience allowed me to develop strong project management skills and the ability to coordinate with technical teams, executive teams, and sales to produce effective messaging and content. I also took the lead in communications efforts, including production for press, trade shows, and collaboration with automotive partners. These experiences have honed my ability to work under pressure and deliver high-quality results within tight deadlines.\n\nAdditionally, as a Director and Editor for projects such as the iPhone X keynote introduction video and an animated educational program for kids, I have gained valuable skills in directing, editing, and collaborating with creative teams. I am adept at managing the tone and visual delivery of stories, advertisements, and promotional materials. Moreover, my experience as an Editor for Amazon's original programming involved executing post-production tasks, graphic design, and visual effects, as well as preparing content for quality control and delivery.\n\nI possess expertise in various software and tools, including Final Cut Pro, Premiere, DaVinci Resolve, After Effects, Cinema4D, and Figma. I am experienced in media management, compression, and delivery workflows. I am also well-versed in content development, collaborative scriptwriting, storyboarding, production timelines, and production management.\n\nI am confident that my strong organizational skills, attention to detail, and ability to thrive in a fast-paced environment make me a perfect fit for the Java position at your company. I am excited about the opportunity to contribute to your team and help drive innovation through my technical and creative skills.\n\nThank you for considering my application. I look forward to the possibility of discussing how my experiences align with your company's needs in further detail.\n\nSincerely,\nCharles Bloomberg",
  });
  const handleLineHeightChange = event => {
    setLineHeight(event.target.value);
  };

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
  };

  const handleZoomChange = event => {
    setZoom(event.target.value);
  };

  const divStyle = {
    transformOrigin: 'top left',
    transform: `scale(${zoom / 100})`,
  };

  // Define the content for editable elements using dangerouslySetInnerHTML
  // const content = {
  //   name: 'Charles Bloomberg',
  //   address: 'q9',
  //   phone: '0387788906',
  //   email: 'hunglinode008@protonmail.com',
  //   introDate: 'April 20, 2023',
  //   company: 'hung',
  //   addressto: 'Dear Google',
  //   content: 'cccccccccccccccccccc',
  // };

  // const content2 = await getCoverLetter(1, 1);
  // const content = {
  //   name: content2.user.name,
  //   address: content2.user.address,
  //   phone: content2.user.phone,
  //   email: content2.user.email,
  //   introDate: 'April 20, 2023',
  //   company: content2.user.company,
  //   addressto: 'Dear Google',
  //   content: content2.description,
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const content2 = await getCoverLetter(1, 1);
  //       setContent({
  //         name: content2.user.name,
  //         address: content2.user.address,
  //         phone: content2.user.phone,
  //         email: content2.user.email,
  //         company: content2.user.company,
  //         content: content2.description,
  //       });
  //     } catch (error) {
  //       // Handle any errors that occur during the data fetch
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   fetchData();
  // }, [content]);

  const [tooltip, setTooltip] = useState(null);
  const [currentText, setCurrentText] = useState(null);
  const [textareaState, setTextareaState] = useState('');
  const [isLnPayPending, setIsLnPayPending] = useState(false);

  function handleMouseUp(event, key) {
    const selection = window.getSelection();
    console.log('key: ', key);
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const x = rect.left + window.scrollX + rect.width / 2;
      const y = rect.top + window.scrollY;

      setCurrentText(selection.toString());
      setTooltip({ x, y, text: selection.toString(), key });
    } else {
      setTooltip(null);
    }
  }

  useEffect(() => {
    if (isLnPayPending) {
      return;
    }
    function handleMouseDown() {
      setCurrentText(null);
    }
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [tooltip, isLnPayPending]);

  return (
    <>
      <Box
        top={tooltip?.y}
        left={tooltip?.x}
        display={tooltip?.text ? 'block' : 'none'}
        position="absolute"
        zIndex={100}
      >
        <>
          <VStack gap={1} bgColor="bg-modal" borderRadius="lg">
            <Box layerStyle="cardLg" p={3}>
              <Card
                styles={{ background: 'white', borderRadius: 'lg', witdh: '5px', height: '5px' }}
              >
                <CommentOutlined /> Comment
              </Card>
            </Box>
          </VStack>
        </>
      </Box>
      <div className="sample-generator-wrapper">
        <div className="toolbar">
          <div className="slider">
            <label>
              Line height <strong>{lineHeight}em</strong>
            </label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.01"
              value={lineHeight}
              onChange={handleLineHeightChange}
            />
          </div>
          <div className="slider">
            <label>
              Font size <strong>{fontSize}pt</strong>
            </label>
            <input
              type="range"
              min="6"
              max="14"
              step="0.1"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
          <div className="slider">
            <label>
              Zoom <strong>{zoom}%</strong>
            </label>
            <input
              type="range"
              min="20"
              max="200"
              step="1"
              value={zoom}
              onChange={handleZoomChange}
            />
          </div>
        </div>
        <div className="config" data-active="" />
        <div className="wrapper" style={divStyle}>
          <div className="cover-preview-wrapper">
            <div className="preview">
              <div className="inner">
                <div className="break-page">
                  Break
                  <div />
                </div>
                <div className="resume">
                  <div className="" template="omega-template" id="resumeWrapper">
                    <article
                      className="omegacover"
                      data-icons="true"
                      style={{ fontSize: `${fontSize}pt`, lineHeight: `${lineHeight}em` }}
                    >
                      <h1 className="name">
                        <span
                          className="editableContent cursor-text"
                          id="cl-name-name"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content.name }}
                        />
                      </h1>
                      <div className="contact">
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-address-address"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content.address }}
                        />
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-phone-phone"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content.phone }}
                        />
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-email-email"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content.email }}
                        />
                      </div>
                      <div className="intro">
                        {/* <span
                        className="contact-item"
                        id="cl-intro-date"
                        contentEditable="true"
                        // defaultValue={content.introDate}
                        onMouseUp={event => handleMouseUp(event, 'introDate')}
                        dangerouslySetInnerHTML={{ __html: content.introDate }}
                      /> */}
                        <span
                          className="contact-item"
                          id="cl-intro-date"
                          // defaultValue={content.introDate}
                          onMouseUp={event => handleMouseUp(event, 'introDate')}
                        >
                          {content.introDate}
                        </span>
                        <span
                          className="editableContent cursor-text contact-item"
                          id="cl-company-company"
                          contentEditable="true"
                          dangerouslySetInnerHTML={{ __html: content.company }}
                        />
                        {/* <span
                        className="editableContent cursor-text contact-item"
                        id="cl-addressto-addressto"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: content.addressto }}
                      /> */}
                      </div>
                      <div className="item">
                        <p>
                          <span
                            style={{ overflow: 'auto' }}
                            className=""
                            id="cl-content-content"
                            // contentEditable="true"
                            onMouseUp={event => handleMouseUp(event, 'content')}
                            // onMouseUp={handleMouseUp}
                          >
                            {content.content}
                          </span>
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="compiler-aside" />
        </div>
      </div>
    </>
  );
}

export default ResumeGenerator;
