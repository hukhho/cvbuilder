import { Divider, Typography } from 'antd';
import './CVTemplates.scss';
import { useState } from 'react';
import StandardItem from './StandardItem';
import DraggableItem from '../DraggableItem';

const ExperiencesSection = ({ experiences }) => {
  const [components, setComponents] = useState(experiences);

  const moveItem = (fromIndex, toIndex) => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, movedComponent);
    setComponents(newComponents);
  };

  return (
    <div className="experiences-section-container">
      <div className="title">
        <Typography.Title level={2} style={{ margin: 0 }}>
          Experiences
        </Typography.Title>
        <Divider />
        <div className="experience-items">
          {components.map((exp, index) => {
            const { startDate, endDate, description, companyName, role, location } = exp;
            return (
              <DraggableItem key={index} id={exp.id} index={index} moveItem={moveItem}>
                <StandardItem
                  key={exp.id}
                  title={role}
                  location={location}
                  startTime={startDate}
                  endTime={endDate}
                  orgName={companyName}
                  renderRightSubtitle
                  description={description}
                />
              </DraggableItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ExperiencesSection;
