import React from 'react';
import { Button } from 'antd';

const ExperienceActions = ({ onDeleteExperience, onEditExperience, experience }) => {
  return (
    <div>
      <div className="experience-actions">
        <button className="experience-edit" onClick={() => onEditExperience(experience)}>
          EDIT
        </button>
        <button className="experience-delete" onClick={() => onDeleteExperience(experience.id)}>
          DELETE
        </button>
        <button className="experience-hide">HIDE</button>
      </div>
      {/* <div className="experience-actions">
                <Button type="primary w-full" style={{ backgroundColor: 'rgb(77, 112, 235)' }}>
                    CREATE NEW EXPERIENCE
                </Button>
            </div> */}
    </div>
  );
};

export default ExperienceActions;
