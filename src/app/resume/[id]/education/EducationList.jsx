import React from 'react';
import EducationItem from './EducationItem';
import EducationActions from './EducationActions';

const EducationList = ({ onEditEducation, onDeleteEducation, educations }) => {
    return (
        <div>
            {educations.map((education, index) => (
                <div key={index}>
                    <EducationItem collegeName={education.collegeName} />
                    <EducationActions onDeleteEducation={onDeleteEducation} onEditEducation={onEditEducation} education={education} />
                </div>
            ))}
        </div>
    );
};

export default EducationList;