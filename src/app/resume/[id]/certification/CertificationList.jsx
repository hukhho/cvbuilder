import React from 'react';
import CertificationItem from './CertificationItem';
import CertificationActions from './CertificationActions';

const CertificationList = ({ certifications }) => {
  return (
    <div>
      {certifications.map((certification, index) => (
        <div key={index}>
          <CertificationItem title={certification.title} company={certification.company} />
          <CertificationActions />
        </div>
      ))}
    </div>
  );
};

export default CertificationList;
