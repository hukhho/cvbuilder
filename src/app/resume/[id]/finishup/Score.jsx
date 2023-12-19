/* eslint-disable */

import React, { use, useEffect, useState } from 'react';
import './score.css';
// import './button.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScoreCircle from './ScoreCirle';
import Link from 'next/link';

const ScoreFinishUp = ({ checked, onChange, data, cvId }) => {
  const {
    scoreContent,
    scorePractice,
    scoreOptimization,
    scoreFormat,
    content,
    optimization,
    practice,
    format,
  } = data;
  // const { scoreContent, scorePractice, scoreOptimization, scoreFormat } = data;

  // Apply scaling to each score
  const scaledScoreContent = (parseInt(scoreContent.score, 10) / scoreContent.max) * 352;
  const scaledScorePractice = (parseInt(scorePractice.score, 10) / scorePractice.max) * 352;
  const scaledScoreOptimization =
    (parseInt(scoreOptimization.score, 10) / scoreOptimization.max) * 352;
  const scaledScoreFormat = (parseInt(scoreFormat.score, 10) / scoreFormat.max) * 352;

  // Now you have the scaled scores
  console.log('data.scoreContent: ', scaledScoreContent);

  const [activeSection, setActiveSection] = useState('Content');
  const handleButtonClick = section => {
    setActiveSection(section);
  };
  useEffect(() => {
    console.log('Score Finish Up: data', data);
    console.log('Score Finish Up: content', content);
  }, [data]);

  const filteredContent = content?.filter(item => item?.score < item?.max);
  const filteredOptimization = optimization?.filter(item => item?.score < item?.max);
  const filteredPractice = practice?.filter(item => item?.score < item?.max);
  const filteredFormat = format?.filter(item => item?.score < item?.max);

  return (
    <div className="score-wrapper">
      <header>
        <div>
          <h1>
            Your resume <b style={{ color: 'orange' }}>{data?.result}</b>
          </h1>
          {/* <h2>Creative Producer </h2> */}
        </div>
        {/* <div className="critical-infos">
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
        </div> */}
      </header>
      <section>
        <h3>Score Breakdown</h3>
        <p>Audit results which affect your resume's score</p>
        {/* <div className="breakdown-wrapper">
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
                    style={{ strokeDasharray: `${scaledScoreContent}, 352` }}
                  />
                </svg>
              </div>

              <div className="lh-gauge__percentage">{scoreContent?.score}</div>
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
                    style={{ strokeDasharray: `${scaledScoreFormat} , 352` }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">{scoreFormat?.score}</div>
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
                    style={{ strokeDasharray: `${scaledScoreOptimization} , 352` }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">{scoreOptimization?.score}</div>
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
                    style={{ strokeDasharray: `${scaledScorePractice} , 352` }}
                  />
                </svg>
              </div>
              <div className="lh-gauge__percentage">{scorePractice?.score}</div>
              <div className="lh-gauge__label">Best practices</div>
            </a>
          </div>
          <div></div>
        </div> */}
        <ScoreCircle
          scoreContent={scoreContent}
          scoreFormat={scoreFormat}
          scoreOptimization={scoreOptimization}
          scorePractice={scorePractice}
        />
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
            className={`pro-ui ${activeSection === 'Format' ? 'active bg-gray-100' : ''}`}
            onClick={() => handleButtonClick('Format')}
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
          {/* <button
            href
            data-size="default"
            data-theme="default"
            data-busy="false"
            className="src-components-Button--kYf2WsZ80yU="
          >
            Best Practices
          </button> */}
        </div>
        <div className="audit-details">
          <div className="details-head">
            <h5>{activeSection}</h5>
            <p>See all {activeSection} audits which did not pass</p>
            {activeSection === 'Content' && <span>{scoreContent?.assign}</span>}
            {activeSection === 'Optimization' && <span>{scoreOptimization?.assign}</span>}
            {activeSection === 'Format' && <span>{scoreFormat?.assign}</span>}

            {activeSection === 'Practice' && <span>{scorePractice?.assign}</span>}
          </div>
          <div className="details-list">
            <ul>
              {activeSection === 'Content' &&
                filteredContent?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          {item?.critical && <span className="critical-badge">CRITICAL</span>}
                          <span>
                            Your resume has{' '}
                            {item?.analyze?.experience > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.experience} experiences
                              </span>
                            )}
                            {item?.analyze?.project > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.project} project
                              </span>
                            )}
                            {item?.analyze?.involvement > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.involvement} involvement
                              </span>
                            )}{' '}
                            without {item?.title.toLowerCase()}
                          </span>
                        </h6>
                        <p>  {item?.description}</p>
                        <div>
                          {item?.analyze?.moreInfos?.map((itemChild, index) => (
                            <Link
                              key={index}
                              href={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                              as={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                            >
                              <div className="badge experience">{itemChild?.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}

              {activeSection === 'Optimization' &&
                filteredOptimization?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          {item?.critical && <span className="critical-badge">CRITICAL</span>}
                          <span>
                            Your resume has{' '}
                            {item?.analyze?.experience > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.experience} experiences
                              </span>
                            )}
                            {item?.analyze?.project > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.project} project
                              </span>
                            )}
                            {item?.analyze?.involvement > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.involvement} involvement
                              </span>
                            )}{' '}
                            without {item?.title.toLowerCase()}
                          </span>
                        </h6>
                        <p>{item?.description}</p>
                        <div>
                          {item?.analyze?.moreInfos?.map((itemChild, index) => (
                            <Link
                              key={index}
                              href={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                              as={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                            >
                              <div className="badge experience">{itemChild?.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}

              {activeSection === 'Practice' &&
                filteredPractice?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          {item?.critical && <span className="critical-badge">CRITICAL</span>}
                          <span>
                            Your resume has{' '}
                            {item?.analyze?.experience > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.experience} experiences
                              </span>
                            )}
                            {item?.analyze?.project > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.project} project
                              </span>
                            )}
                            {item?.analyze?.involvement > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.involvement} involvement
                              </span>
                            )}{' '}
                            without {item?.title.toLowerCase()}
                          </span>
                        </h6>
                        <p>{item?.description}</p>
                        <div>
                          {item?.analyze?.moreInfos?.map((itemChild, index) => (
                            <Link
                              key={index}
                              href={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                              as={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                            >
                              <div className="badge experience">{itemChild?.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}

              {activeSection === 'Format' &&
                filteredFormat?.map((item, index) => {
                  return (
                    <li>
                      <i>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#d40000' }} />
                      </i>
                      <div>
                        <h6>
                          {item?.critical && <span className="critical-badge">CRITICAL</span>}
                          <span>
                            Your resume has{' '}
                            {item?.analyze?.experience > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.experience} experiences
                              </span>
                            )}
                            {item?.analyze?.project > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.project} project
                              </span>
                            )}
                            {item?.analyze?.involvement > 0 && (
                              <span className="exp-color before:first:hidden before:content-[',_'] before:mr-0.5">
                                {item?.analyze?.involvement} involvement
                              </span>
                            )}{' '}
                            without {item?.title}
                          </span>
                        </h6>
                        <p>{item?.description}</p>
                        <div>
                          {item?.analyze?.moreInfos?.map((itemChild, index) => (
                            <Link
                              key={index}
                              href={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                              as={`/resume/${cvId}/${itemChild?.typeName}?typeId=${itemChild?.typeId}`}
                            >
                              <div className="badge experience">{itemChild?.title}</div>
                            </Link>
                          ))}
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
