"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConfigProvider } from "antd";
import { Button, Card } from "antd";
const { Meta } = Card;
import UserCVBuilderHeader from "@/app/components/UserCVBuilderHeader";
import UserCVBuilderLayout from "@/app/components/Layout/UseCVBuilderLayout";
import ExperienceForm from "@/app/components/Form/ExperienceForm";
import "./test.css";
import Resume from "./Resume";

const FinishUp = ({ params }) => {
  const [templateData, setTemplateData] = useState(null);
  const [enabledCategories, setEnabledCategories] = useState({
    "FINISH UP": true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/cv/templates/get-template-example"
        );
        const data = await response.json();
        setTemplateData(data);
      } catch (error) {
        console.error("Error fetching the template:", error);
      }
    }

    fetchData();
  }, []);

  const contentStyle = {
    display: "flex",
    height: "100vh",
  };

  const resumeStyle = {
    padding: "20px",
  };

  const headerStyle = {
    backgroundColor: "rgb(77, 112, 235)",
    color: "white",
  };

  const resumeData = {
    personalInfo: {
      id: 0,
      name: "Test 123",
      email: "test@gmail.com",
      phone: "(123) 456-7890",
    },
    summary:
      "Experienced web developer with a passion for creating responsive and user-friendly websites.",
    experience: [
      {
        id: 1,
        title: "Web Developer",
        company: "Company XYZ",
        date: "January 2020 - Present",
        description:
          "Developed and maintained web applications using HTML, CSS, and JavaScript. Collaborated with cross-functional teams to deliver high-quality web solutions.",
      },
    ],
    education: [
      {
        id: 1,
        location: "Harvard",
        description: "Bachelor's in Computing",
        endYear: 2023,
        degree: "Bachelor of Science",
        collegeName: "Harvard University",
        minor: "Computer Science",
        gpa: 4.0,
      },
    ],
    skills: ["HTML, CSS, JavaScript"],
  };

  return (
    <main>
      <ConfigProvider>
        <UserCVBuilderLayout
          userHeader={
            <UserCVBuilderHeader
              initialEnabledCategories={enabledCategories}
              cvId={params.id}
            />
          }
          content={
            <>
              <div className="w-[902.03px] h-[77.59px] pl-[17.99px] pr-[17.95px] pt-[4.50px] pb-[4.49px] justify-start items-start inline-flex">
                <div className="grow shrink basis-0 h-[68.58px] pr-[122.91px] py-[8.30px] justify-start items-center gap-[8.99px] flex">
                  <div className="pl-2.5 pr-[9.01px] pt-[8.78px] pb-[10.82px] opacity-80 bg-neutral-500 bg-opacity-20 rounded-[5px] justify-start items-center flex">
                    <div className="text-slate-700 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3">
                      Explore My Rezi score
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center flex">
                  <div className="pl-[19.04px] pr-[18.57px] pt-[26.78px] pb-7 justify-start items-center flex">
                    <div className="pb-[0.82px] justify-start items-end gap-[3.87px] flex">
                      <div className="text-slate-700 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3">
                        Auto-adjust
                      </div>
                      <div className="text-stone-300 text-[10.08px] font-bold font-['Source Sans Pro'] uppercase leading-[10.08px]">
                        BETA
                      </div>
                    </div>
                  </div>
                  <div className="px-[9px] py-[18px] justify-start items-center flex">
                    <div className="px-2.5 pt-[8.78px] pb-2.5 rounded-[5px] justify-start items-end gap-[2.71px] flex">
                      <div className="pb-[0.82px] justify-start items-start flex">
                        <div className="text-slate-700 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3">
                          Adjustments
                        </div>
                      </div>
                      <div className="w-[12.57px] h-[12.59px] px-[2.62px] py-[4.20px] justify-start items-start flex" />
                    </div>
                  </div>
                  <div className="pl-[19.01px] pr-[33.68px] pt-[26.78px] pb-[28.82px] justify-start items-center flex">
                    <div className="text-slate-700 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3">
                      Template
                    </div>
                  </div>
                  <div className="pl-[9px] pr-[27px] py-[18px] justify-start items-center flex">
                    <div className="px-2.5 pt-[8.78px] pb-2.5 bg-neutral-500 bg-opacity-20 rounded-[5px] justify-start items-end gap-[2.18px] flex">
                      <div className="pb-[0.82px] justify-start items-start flex">
                        <div className="text-slate-700 text-xs font-bold font-['Source Sans Pro'] uppercase leading-3">
                          Download
                        </div>
                      </div>
                      <div className="w-[12.57px] h-[12.59px] px-[2.62px] py-[4.20px] justify-start items-start flex" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-md p-4 select-none text-[#2e3d50] flex space-x-8">
                <div
                  style={{
                    width: "66.66%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={resumeStyle} className="bg-white">
                    {/* <div className="resume alpha">
                      <div className="hero havePicture">
                        <div className="name">
                          {resumeData.personalInfo.name}
                        </div>
                        <div className="contact">
                          <div className="contact-item">
                            <svg
                              className="contact-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                            </svg>
                            <span>Email: {resumeData.personalInfo.email}</span>
                          </div>
                          <div className="contact-item">
                            <svg
                              className="contact-icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                            </svg>
                            <span>Phone: {resumeData.personalInfo.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="section-header">Summary</div>
                      <div className="summary">
                        <div className="item">{resumeData.summary}</div>
                      </div>
                      <div className="section-header">Education</div>
                      <div className="education">
                        {resumeData.education.map((edu, index) => (
                          <div className="item" key={index}>
                            <span>{edu.degree}</span>
                            <span>{edu.collegeName}</span>
                            <span>{edu.endYear}</span>
                            <p>{edu.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="section-header">Experience</div>
                      <div className="experience">
                        {resumeData.experience.map((exp, index) => (
                          <div className="item" key={index}>
                            <span>{exp.title}</span>
                            <span>{exp.company}</span>
                            <span>{exp.date}</span>
                            <p>{exp.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="section-header">Skills</div>
                      <div className="skills">
                        <div className="item">
                          <span>{resumeData.skills.join(", ")}</span>
                        </div>
                      </div>
                    </div> */}
                    <Resume />
                  </div>
                </div>

                <div
                  style={{
                    width: "33.33%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ height: "33.33%" }}>
                    <p>
                      <a href="https://app.rezi.ai/dashboard/resume/jnB6pSiIUsbkyJXK4HG8/experience?wvideo=fo7dvqzmxu">
                        <img
                          src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.jpg?image_play_button_size=2x&amp;image_crop_resized=960x540&amp;image_play_button=1&amp;image_play_button_color=ebeaede0"
                          width="400"
                          height="225"
                          style={{ width: "400px", height: "225px" }}
                          alt="Video Thumbnail"
                        />
                      </a>
                    </p>
                  </div>
                  <div style={{ height: "33.33%" }}>
                    <h1>REZI EXPERT REVIEW</h1>
                    <p>
                      We'll correct all formatting, content, and grammar errors
                      directly in your resume
                    </p>
                    <Button className="form-button w-full" style={headerStyle}>
                      ASK FOR REZI EXPERT REVIEW
                    </Button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </ConfigProvider>
    </main>
  );
};

export default FinishUp;
