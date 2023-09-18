import React from 'react';
import { Button } from 'antd';
const EducationActions = ({ onDeleteEducation, onEditEducation, education }) => {
    return (
        <div>
            <div className="education-actions">
                <button className="education-edit" onClick={() => onEditEducation(education)}>EDIT</button>
                <button className="education-delete" onClick={() => onDeleteEducation(education.id)}>DELETE</button>
                <button className="education-hide">HIDE</button>
            </div>
            {/* <div className="education-actions">
                <Button type="primary w-full" style={{ backgroundColor: 'rgb(77, 112, 235)' }}>
                    CREATE NEW EDUCATION
                </Button>
            </div> */}
        </div>
    );
};

export default EducationActions;