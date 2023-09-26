import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects }) => {
  return (
    <div>
      {projects.map((project, index) => (
        <div key={index}>
          <ProjectItem title={project.title} company={project.company} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
