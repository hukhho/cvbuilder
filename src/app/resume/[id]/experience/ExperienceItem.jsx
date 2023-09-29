import React from 'react';

const ExperienceItem = ({ role, companyName }) => {
  return (
    <div className="experience-item">
      <div className="experience-role">{role}</div>
      <div className="experience-companyName">{companyName}</div>
    </div>
  );
};

export default ExperienceItem;
