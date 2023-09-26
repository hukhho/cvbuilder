import React from 'react';
import ExperienceItem from './ExperienceItem';
import ExperienceActions from './ExperienceActions';

const ExperienceList = ({ onDeleteExperience, onEditExperience, experiences }) => {
  return (
    <div>
      {experiences.map((experience, index) => (
        <div key={index}>
          <ExperienceItem role={experience.role} companyName={experience.companyName} />
          <ExperienceActions onDeleteExperience={onDeleteExperience} onEditExperience={onEditExperience} experience={experience} />
        </div>
      ))}
    </div>
  );
};

export default ExperienceList;
