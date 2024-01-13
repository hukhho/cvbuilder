// SectionForm.js
import React from 'react';
import ExperienceForm from '@/app/components/Form/ExperienceForm'; // Import your existing ExperienceForm
import ProjectForm from '@/app/components/Form/ProjectForm';
import EducationForm from '@/app/components/Form/EducationForm';
import CertificationForm from '@/app/components/Form/CertificationForm';
import InvolvementForm from '@/app/components/Form/InvolvementForm';
import SkillsForm from '@/app/components/Form/SkillForm';

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
  if (sectionType === 'projects') {
    return <ProjectForm cvId={cvId} onCreated={onExperienceCreated} data={experience} />;
  }
  if (sectionType === 'educations') {
    return (
      <EducationForm cvId={cvId} onEducationCreated={onExperienceCreated} education={experience} />
    );
  }
  if (sectionType === 'certifications') {
    return (
      <CertificationForm
        cvId={cvId}
        onEducationCreated={onExperienceCreated}
        education={experience}
      />
    );
  }
  if (sectionType === 'involvements') {
    return <InvolvementForm cvId={cvId} onCreated={onExperienceCreated} data={experience} />;
  }
  if (sectionType === 'skills') {
    return <SkillsForm cvId={cvId} onCreated={onExperienceCreated} data={experience} />;
  }
  return <div>Unknow</div>;
};

export default SectionForm;
