import React from 'react';

const EducationItem = ({ collegeName }) => {
    return (
        <div className="education-item">
            <div className="education-collegeName">{collegeName}</div>
        </div>
    );
};


export default EducationItem;