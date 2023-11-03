'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './sidebar.css';
import './sidebar1.css'
import './sidebarlayout.css'
import './layout.css'

export default function TestPage() {
  return (
    <div id="customColors" style={{}}>
      <div className>
        <div className="background" />
        <main className="page">
          <div className="sidebarOverlay" />
          <div className="main" role="navigation">
            <div
              className="aside-wrapper"
              data-open="false"
              data-docked="true"
            >
              <aside className="sidebar">
                <div className="gradient-canvas-wrapper isLoaded">
                  <canvas id="gradient-canvas" width={1536} height={600} className="isLoaded" />
                </div>
                <div className="main-nav-wrapper">
                  <a aria-label="Logo" className href="/" target>
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      viewBox="0 0 389 185"
                      className="logo"
                    >
                      <path
                        fill="#48c9b0"
                        d="M37.6 35.9V185L0 147.3V36.9L36.9 0h55.2L129 36.9v16.3L91.1 90.8v-55zm91.4 91.8v56.2H91.3l-.3-57H74.8L38.7 90.8h53.4z"
                      />
                      <path
                        fill="#16a085"
                        d="M37.6 46.7 0 36.9l1-1h36.6zm53.5-10.8H80.2L89.5 0H91zm37.1 91 .8.8-37.9 10.1V127h37.1z"
                      />
                      <g fill="#fff">
                        <path d="M242.1 134.3h-26.7l-20.2-31.7h-.2v31.7h-21.4V51.8h32c16.3 0 28.7 7.8 28.7 25.4 0 11.4-6.3 21.2-18.1 23.3zm-47.2-45.5h2.1c7 0 14.9-1.3 14.9-10.3S204 68.2 197 68.2h-2.1zM302.4 109.6h-41.9c0 8.1 4.3 12.5 12.5 12.5 4.3 0 7.3-1.4 9.5-5.1h19.1c-3.2 13.2-15.8 19.3-28.5 19.3-18.6 0-32.5-10.5-32.5-29.9 0-18.7 12.8-30 31.1-30 19.5 0 30.7 12 30.7 31.2zm-18.5-11.5c-1-5.4-5.9-8.9-11.3-8.9-5.8 0-10.6 3.1-11.8 8.9zM359.9 117.8v16.5H303l26.4-39.6h-22.9V78.2h56l-26.3 39.6zM388.2 56.6c0 6.1-5 11.2-11.2 11.2s-11.2-5-11.2-11.2c0-6.1 5-11.2 11.2-11.2s11.2 5.1 11.2 11.2zm-1.2 77.7h-19.9V78.2H387z" />
                      </g>
                    </svg>
                  </a>
                  <button
                    href
                    data-size="default"
                    data-theme="default"
                    data-busy="false"
                    className="cta-button cta button"
                    id="navi-create-new-resume"
                  >
                    {' '}
                    <i className="fad fa-file-plus" aria-hidden="true" />
                    <span>Create new resume</span>
                  </button>
                  <nav className="nav">
                    <a
                      id="my-resumes"
                      aria-current="page"
                      className="side-bar-nav nav-item button active"
                      href="/dashboard/resumes"
                      target
                    >
                      <div className="icon_wrap">
                        <i
                          className="fad fa-file button icon"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="icon-button-label">My dashboard</span>
                    </a>
                    {/* <a
                      id="sample-list"
                      className="side-bar-nav src-components-Sidebar--Q-B8ohUMiTI= src-components-IconButton--b3ELWdiZ27o= "
                      href="/dashboard/samples"
                      target
                    >
                      <div className="src-components-IconButton--Ru0PkId2mxI=">
                        <i
                          className="fad fa-file-alt src-components-IconButton--V-yuP6X940M="
                          aria-hidden="true"
                        />
                      </div>
                      <span className="icon-button-label">Sample Library</span>
                      <span className="src-components-IconButton--TwWX05f8XU4= src-components-IconButton--chwgX6-KmpE=">
                        New
                      </span>
                    </a>
                    <a
                      id="review-my-resume"
                      className="side-bar-nav src-components-Sidebar--Q-B8ohUMiTI= src-components-IconButton--b3ELWdiZ27o= "
                      href="/dashboard/review/new"
                      target
                    >
                      <div className="src-components-IconButton--Ru0PkId2mxI=">
                        <i
                          className="fad fa-file-check src-components-IconButton--V-yuP6X940M="
                          aria-hidden="true"
                        />
                      </div>
                      <span className="icon-button-label">Review my resume</span>
                    </a>
                    <a
                      id="my-profile"
                      className="interview-nav src-components-Sidebar--Q-B8ohUMiTI= src-components-IconButton--b3ELWdiZ27o= "
                      href="/dashboard/interviews"
                      target
                    >
                      <div className="src-components-IconButton--Ru0PkId2mxI=">
                        <i
                          className="fad fa-waveform src-components-IconButton--V-yuP6X940M="
                          aria-hidden="true"
                        />
                      </div>
                      <span className="icon-button-label">AI Interview</span>
                    </a> */}
                  </nav>
                  <div className="sidebar-ai-counter src-components-AITokenCounter--lSWrSir7-cE=">
                    <button>
                      <div className="unvisible-section src-components-AITokenCounter--U9u6kHaN5NE=">
                        <div>
                          <b> AI credits</b>
                        </div>
                        <div>
                          <span className="icon-button-label">5,627</span>
                          <i className="fas fa-solid fa-coin" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="visible-section src-components-AITokenCounter--R66UqwHauEA=">
                        <i className="fas fa-solid fa-coin" aria-hidden="true" />
                        <span className="icon-button-label">AI credits 5,627</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="src-components-Sidebar--4YYX1-ZewXA=">
                  <div />
                  <div style={{ display: 'none' }} />
                  <div className="log-out-nav src-components-Sidebar--d3y-nmydVGU= src-components-IconButton--b3ELWdiZ27o= ">
                    <div className="src-components-IconButton--Ru0PkId2mxI=">
                      <i
                        className="fad fa-sign-out-alt src-components-IconButton--V-yuP6X940M="
                        aria-hidden="true"
                      />
                    </div>
                    <span className="icon-button-label">Log out</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
