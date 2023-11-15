/* eslint-disable */

import { Divider, Typography } from 'antd';

const SummarySection = ({ summary }) => {
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
          className="editableContent cursor-text designStudio section-header"
          id="experience-heading"
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
            <p className="editableContent ghost-hightlight w-full designStudio ">
              <span>
                <span className="">{summary}</span>
              </span>
            </p>
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
