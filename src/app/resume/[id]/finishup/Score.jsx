import React, { use, useEffect, useState } from 'react';
import './score.css';
// import './button.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScoreFinishUp = ({ checked, onChange, data }) => {
  const { content, optimization, practice } = data[0];
  const [activeSection, setActiveSection] = useState('Content');
  const handleButtonClick = section => {
    setActiveSection(section);
  };
  useEffect(() => {
    console.log('Score Finish Up: data', data);
    console.log('Score Finish Up: content', content);
  }, [data]);

  return (
    <div className="score-wrapper">
      <header>
        <div>
          <h1>
            Your resume needs <b style={{ color: 'orange' }}>improvement</b>
          </h1>
          <h2>Creative Producer </h2>
        </div>
        <div className="critical-infos">
          <div>
            <span>Critical mistakes</span>
            <span>
              <b>25</b>
              <sub>/163</sub>
            </span>
          </div>
          <div>
            <span>Content: </span>
            <b>6</b>
            <span>Format: </span>
            <b>8</b>
            <span>Usage: </span>
            <b>11</b>
          </div>
        </div>
      </header>
      <section>
        <h3>Rezi Score Breakdown</h3>
        <p>Audit results which affect your resume's Rezi Score</p>
        <div className="breakdown-wrapper">
          <div>
            <a href="#audit-details" className="lh-gauge__wrapper lh-gauge__wrapper--average">
              <div className="lh-gauge__svg-wrapper ">
                <svg viewBox="0 0 120 120" className="lh-gauge">
                  <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
                  <circle
                    className="lh-gauge-arc"
                    transform="rotate(-90 60 60)"
                    r={56}
                    cx={60}
                    cy={60}
                    style={{ strokeDasharray: '249.806, 352' }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">70</div>
              <div className="lh-gauge__label">Content</div>
            </a>
          </div>
          <div>
            <a href="#audit-details" className="lh-gauge__wrapper lh-gauge__wrapper--pass">
              <div className="lh-gauge__svg-wrapper ">
                <svg viewBox="0 0 120 120" className="lh-gauge">
                  <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
                  <circle
                    className="lh-gauge-arc"
                    transform="rotate(-90 60 60)"
                    r={56}
                    cx={60}
                    cy={60}
                    style={{ strokeDasharray: '323.636, 352' }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">91</div>
              <div className="lh-gauge__label">Format</div>
            </a>
          </div>
          <div>
            <a href="#audit-details" className="lh-gauge__wrapper lh-gauge__wrapper--fail">
              <div className="lh-gauge__svg-wrapper ">
                <svg viewBox="0 0 120 120" className="lh-gauge">
                  <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
                  <circle
                    className="lh-gauge-arc"
                    transform="rotate(-90 60 60)"
                    r={56}
                    cx={60}
                    cy={60}
                    style={{ strokeDasharray: '3.45098, 352' }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">0</div>
              <div className="lh-gauge__label">Optimization</div>
            </a>
          </div>
          <div>
            <a href="#audit-details" className="lh-gauge__wrapper lh-gauge__wrapper--pass">
              <div className="lh-gauge__svg-wrapper ">
                <svg viewBox="0 0 120 120" className="lh-gauge">
                  <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
                  <circle
                    className="lh-gauge-arc"
                    transform="rotate(-90 60 60)"
                    r={56}
                    cx={60}
                    cy={60}
                    style={{ strokeDasharray: '335.004, 352' }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">95</div>
              <div className="lh-gauge__label">Best practices</div>
            </a>
          </div>
          <div>
            <a href="#audit-details" className="lh-gauge__wrapper lh-gauge__wrapper--average">
              <div className="lh-gauge__svg-wrapper ">
                <svg viewBox="0 0 120 120" className="lh-gauge">
                  <circle className="lh-gauge-base" r={56} cx={60} cy={60} />
                  <circle
                    className="lh-gauge-arc"
                    transform="rotate(-90 60 60)"
                    r={56}
                    cx={60}
                    cy={60}
                    style={{ strokeDasharray: '249.806, 352' }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">78</div>
              <div className="lh-gauge__label">Application Ready</div>
            </a>
          </div>
        </div>
      </section>
      <section id="audit-details">
        <h3>Resume Audits</h3>
        <p>Passed or failed audits for each category</p>
        <div className="audits-menu">
          <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className={`pro-ui ${activeSection === 'Content' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Content')}
          >
            Content
          </button>
          <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className="src-components-Button--kYf2WsZ80yU="
          >
            Format
          </button>
          <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className={`pro-ui ${activeSection === 'Optimization' ? 'active bg-gray-100' : ''}`}
            onClick={() => handleButtonClick('Optimization')}
          >
            Optimization
          </button>
          <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className={`pro-ui ${activeSection === 'Practice' ? 'active bg-gray-100' : ''}`}
            onClick={() => handleButtonClick('Practice')}
          >
            Practice
          </button>
          <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className="src-components-Button--kYf2WsZ80yU="
          >
            Best Practices
          </button>
        </div>
        <div className="audit-details">
          <div className="details-head">
            <h5>{activeSection}</h5>
            <p>See all {activeSection} audits which did not pass</p>
            <span>22 / 31</span>
          </div>
          <div className="details-list">
            <ul>
              {activeSection === 'Content' &&
                content?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          <span className="critical-badge">CRITICAL</span>
                          <span>
                            Your resume has{' '}
                            <span className="exp-color">{item?.detail?.length} experiences</span>{' '}
                            without {item.title}
                          </span>
                        </h6>
                        <p>{item.description}</p>
                        <div>
                          {item.detail.map((itemChild, index) => {
                            return (
                              <>
                                <div className="badge experience">{itemChild.title}</div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}

              {activeSection === 'Optimization' &&
                optimization?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          <span className="critical-badge">CRITICAL</span>
                          <span>{item.title}</span>
                        </h6>
                        <p>{item.description}</p>
                        <div>
                          {item.detail.map((itemChild, index) => {
                            return (
                              <>
                                <div className="badge experience">{itemChild.title}</div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}

              {activeSection === 'Practice' &&
                practice?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          <span className="critical-badge">CRITICAL</span>
                          <span>{item.title}</span>
                        </h6>
                        <p>{item.description}</p>
                        <div>
                          {item.detail?.map((itemChild, index) => {
                            return (
                              <>
                                <div className="badge experience">{itemChild.title}</div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoreFinishUp;
