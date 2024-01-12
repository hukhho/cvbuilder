// SectionForm.js
import React from 'react';
import ExperienceForm from '@/app/components/Form/ExperienceForm'; // Import your existing ExperienceForm

const SectionForm = ({ cvId, onExperienceCreated, experience, sectionType }) => {
  // Customize the form based on the section type, add other logic as needed]
  if (sectionType === 'experiences') {
    return (
      <ExperienceForm
        cvId={cvId}
        onExperienceCreated={onExperienceCreated}
        experience={experience}
      />
    );
  }
  if (sectionType === 'educations') {
    return <div>Education Form</div>;
  }

  return <div>Unknow</div>;
};

export default SectionForm;
