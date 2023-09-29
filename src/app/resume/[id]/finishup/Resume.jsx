import React from 'react';
import './alpha.css';

const Resume = () => {

  const profilePicture = "path_to_your_image.jpg";

  const contactInfo = {
    email: "your_email@example.com",
    phone: "123-456-7890",
    location: "Your Location"
  };

  const summaryText = "Your summary text";

  const experienceData = [
    {
      title: "Job Title 1",
      company: "Company Name 1",
      dates: "Jan 2020 - Dec 2021",
      description: "Your experience description 1"
    },
    {
      title: "Job Title 2",
      company: "Company Name 2",
      dates: "Jan 2018 - Dec 2019",
      description: "Your experience description 2"
    }
  ];

  const skillsData = ["Skill 1", "Skill 2", "Skill 3"];

  const educationData = [
    {
      degree: "Degree 1",
      institution: "Institution Name 1",
      dates: "2015 - 2019",
      description: "Your education description 1"
    },
    {
      degree: "Degree 2",
      institution: "Institution Name 2",
      dates: "2010 - 2014",
      description: "Your education description 2"
    }
  ];

  const projectData = [
    {
      title: "Project Title 1",
      dates: "Jan 2020 - Dec 2021",
      description: "Your project description 1"
    },
    {
      title: "Project Title 2",
      dates: "Jan 2018 - Dec 2019",
      description: "Your project description 2"
    }
  ];

  return (
    <div className="alpha resume">
      <div className="alpha hero havePicture">
        <h1 className="alpha name">Your Name</h1>
        <div className="alpha contact">
          <div className="alpha contact-item">
            <svg className="alpha contact-icon">
              <use xlinkHref="#contact-icon"></use>
            </svg>
            <span>{contactInfo.email}</span>
          </div>
          <div className="alpha contact-item">
            <svg className="alpha contact-icon">
              <use xlinkHref="#contact-icon"></use>
            </svg>
            <span>{contactInfo.phone}</span>
          </div>
          <div className="alpha contact-item-location">
            <svg className="alpha contact-icon">
              <use xlinkHref="#location-icon"></use>
            </svg>
            <span>{contactInfo.location}</span>
          </div>
        </div>
      </div>
      <hr className="alpha" />
      <div className="alpha section-header">Summary</div>
      <div className="alpha summary">
        <div className="alpha item">
          <p>{summaryText}</p>
        </div>
      </div>
      <hr className="alpha" />
      <div className="alpha section-header">Experience</div>
      <div className="alpha experience">
        {experienceData.map((experience, index) => (
          <div className="alpha item" key={index}>
            <span className="alpha experience-title">{experience.title}</span>
            <span className="alpha experience-company">{experience.company}</span>
            <span className="alpha experience-dates">{experience.dates}</span>
            <p>{experience.description}</p>
          </div>
        ))}
      </div>
      <hr className="alpha" />
      <div className="alpha section-header">Skills</div>
      <div className="alpha skills">
        <div className="alpha item">
          {skillsData.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>
      <hr className="alpha" />
      <div className="alpha section-header">Education</div>
      <div className="alpha education">
        {educationData.map((education, index) => (
          <div className="alpha item" key={index}>
            <span className="alpha education-degree">{education.degree}</span>
            <span className="alpha education-institution">{education.institution}</span>
            <span className="alpha education-dates">{education.dates}</span>
            <p>{education.description}</p>
          </div>
        ))}
      </div>
      <hr className="alpha" />
      <div className="alpha section-header">Projects</div>
      <div className="alpha projects">
        {projectData.map((project, index) => (
          <div className="alpha item" key={index}>
            <span className="alpha project-title">{project.title}</span>
            <span className="alpha project-dates">{project.dates}</span>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;