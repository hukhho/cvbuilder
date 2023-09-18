import React from 'react';

const CertificationItem = ({ title, company }) => {
    return (
        <div className="experience-item">
            <div className="experience-title">{title}</div>
            <div className="experience-company">{company}</div>
        </div>
    );
};


export default CertificationItem;