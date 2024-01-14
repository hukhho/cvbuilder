// import React from 'react';

// const CustomSectionPage = ({ params }) => {
//   const sectionName = params.custom;
//   return <div>{sectionName}</div>;
// };
// export default CustomSectionPage;

import React from 'react';
import ExperiencePageCustom from '../experience/ExperiencePageCustom';

const Experience = ({ params }) => {
  const sectionTypeName = params?.custom;
  const titleHeader = 'Your Custom Sections';

  const enabledCategories = { '': true };
  const videoUrl = 'https://fast.wistia.net/embed/iframe/fo7dvqzmxu?autoPlay=true';
  return (
    <ExperiencePageCustom
      params={params}
      sectionTypeName={sectionTypeName}
      titleHeader={titleHeader}
      enabledCategories={enabledCategories}
      videoUrl={videoUrl}
    />
  );
};

export default Experience;
