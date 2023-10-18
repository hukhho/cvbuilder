import React, { useState } from 'react';
import './preview.css';

function ResumeGenerator() {
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontSize, setFontSize] = useState(9);
  const [zoom, setZoom] = useState(100);

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
  const content = {
    name: 'Charles Bloomberg',
    address: 'q9',
    phone: '0387788906',
    email: 'hunglinode008@protonmail.com',
    introDate: 'April 20, 2023',
    company: 'hung',
    addressto: 'Dear Google',
    content: 'cccccccccccccccccccc',
  };

  return (
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
                      <span
                        className="editableContent cursor-text contact-item"
                        id="cl-intro-date"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: content.introDate }}
                      />
                      <span
                        className="editableContent cursor-text contact-item"
                        id="cl-company-company"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: content.company }}
                      />
                      <span
                        className="editableContent cursor-text contact-item"
                        id="cl-addressto-addressto"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: content.addressto }}
                      />
                    </div>
                    <div className="item">
                      <p
                        className="editableContent cursor-text"
                        id="cl-content-content"
                        contentEditable="true"
                        dangerouslySetInnerHTML={{ __html: content.content }}
                      />
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
  );
}

export default ResumeGenerator;
