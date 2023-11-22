/* eslint-disable */

import { Divider, Typography } from 'antd';
import { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

const SummarySection = ({ summary, templateType, handleSummaryChange, layoutStyles }) => {
  const summaryState = useRef(summary);

  const handleChange = (evt, targetName) => {
    console.log('handleChange: ', evt.target.value);
    if (targetName === 'summary') {
      summaryState.current = evt.target.value;
      handleSummaryChange(evt.target.value);
    }
  };

  const handleBlur = (evt, targetName) => {
    if (targetName === 'summary') {
      console.log('handleBlur: ', summaryState.current);
    }
  };
  if (templateType === 'modern') {
    return (
      <>
        <div className="uppercase false " style={{ fontWeight: 600, padding: '0cm 1.4cm' }}>
          <span
            className="editableContent cursor-text  designStudio "
            id="summary-heading"
            style={{ color: 'rgb(46, 61, 80)', fontSize: '1.15em', display: 'block' }}
          >
            Summary
          </span>
        </div>

        <div
          className="relative whitespace-pre-line cursor-text focus:outline-none"
          style={{
            color: 'rgb(46, 61, 80)',
            fontWeight: 400,
            fontSize: '0.85em',
            lineHeight: '1.6em',
            padding: '0cm 1.4cm',
          }}
        >
          <ContentEditable
            className="editableContent cursor-text  designStudio "
            id="summary-summary"
            html={summaryState.current}
            onBlur={e => handleBlur(e, 'summary')}
            onChange={e => handleChange(e, 'summary')}
          />
          {/* <p
            className="editableContent cursor-text  designStudio "
            id="summary-summary"
            contentEditable="true"
          >
            {summary}
          </p> */}
        </div>
      </>
    );
  }
  return (
    <div className="experience leading-snug relative group ">
      <div
        className="uppercase mb-[4px]   "
        style={{
          fontWeight: 600,
          padding: '0cm 1.4cm',
          lineHeight: '1.35em',
        }}
      >
        <span
          className="editableContent cursor-text designStudio"
          id="experience-heading"
          style={{
            color: 'rgb(46, 61, 80)',
            fontSize: '1.15em',
            display: 'block',
          }}
        >
          Summary
        </span>
        <hr class="border-0 border-b-[1px] border-black mt-[1px]"></hr>
      </div>
      {/* <Divider className="divider-section" /> */}
      <div>
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
            <ContentEditable
              className="editableContent cursor-text  designStudio "
              id="summary-summary"
              html={summaryState.current}
              onBlur={e => handleBlur(e, 'summary')}
              onChange={e => handleChange(e, 'summary')}
            />
          </div>
          {/* <p
            className="editableContent cursor-text  designStudio "
            id="history-history"
            tabIndex={0}
            contentEditable="true"
          >
            A production professional with experience creating solutions for the most demanding
            video content challenges. I’m a proven successful collaborator with multi-disciplinary
            teams, artists and personalities.
          </p> */}
        </div>
      </div>
    </div>

    // <div className="summary-section-container mb-4">
    //   <div className="title">
    //     <span style={{ margin: 0 }}>Summary</span>
    //   </div>

    //   <Divider className="divider-section" />

    //   <div className="summary-content">
    //     <span>{summary}</span>
    //   </div>
    // </div>
  );
};

export default SummarySection;
